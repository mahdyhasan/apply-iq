const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Helper function to increment job views
const incrementJobViews = async (userId) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  await pool.execute(`
    INSERT INTO usage_stats (id, user_id, month_year, jobs_viewed) 
    VALUES (?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE 
    jobs_viewed = jobs_viewed + 1,
    last_updated = NOW()
  `, [uuidv4(), userId, currentMonth]);
};

// Get job matches for user
router.get('/matches', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10, company, location, min_score } = req.query;
    const offset = (page - 1) * limit;

    // Check user's job matching limits
    const [userLimits] = await pool.execute(`
      SELECT p.job_match_limit, COALESCE(us.jobs_viewed, 0) as current_views
      FROM user_subscriptions sub
      JOIN packages p ON sub.package_id = p.id
      LEFT JOIN usage_stats us ON sub.user_id = us.user_id 
        AND us.month_year = DATE_FORMAT(NOW(), '%Y-%m')
      WHERE sub.user_id = ? AND sub.status = 'active'
    `, [userId]);

    if (userLimits.length > 0) {
      const { job_match_limit, current_views } = userLimits[0];
      if (job_match_limit !== -1 && current_views >= job_match_limit) {
        return res.status(403).json({ 
          error: 'Job viewing limit reached for your current package',
          limit: job_match_limit,
          current: current_views
        });
      }
    }

    // Build query with filters
    let whereClause = 'WHERE user_id = ?';
    let queryParams = [userId];

    if (company) {
      whereClause += ' AND company LIKE ?';
      queryParams.push(`%${company}%`);
    }

    if (location) {
      whereClause += ' AND location LIKE ?';
      queryParams.push(`%${location}%`);
    }

    if (min_score) {
      whereClause += ' AND match_score >= ?';
      queryParams.push(parseInt(min_score));
    }

    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM job_matches ${whereClause}`,
      queryParams
    );

    // Get job matches
    const [jobMatches] = await pool.execute(`
      SELECT 
        id, job_title, company, location, salary, match_score, job_data, source,
        applied_at, saved_at, created_at
      FROM job_matches 
      ${whereClause}
      ORDER BY match_score DESC, created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, parseInt(limit), offset]);

    // Parse job_data JSON
    const jobs = jobMatches.map(job => ({
      ...job,
      job_data: typeof job.job_data === 'string' ? JSON.parse(job.job_data) : job.job_data
    }));

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit)
      }
    });

  } catch (error) {
    console.error('Get job matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create/save job matches for user (admin function or from external API)
router.post('/matches', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { jobs } = req.body;

    if (!Array.isArray(jobs) || jobs.length === 0) {
      return res.status(400).json({ error: 'Jobs array is required' });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const jobIds = [];

      for (const job of jobs) {
        const {
          job_title, company, location, salary, match_score,
          job_data, source
        } = job;

        if (!job_title || !company || match_score === undefined) {
          continue; // Skip invalid jobs
        }

        const jobId = uuidv4();
        jobIds.push(jobId);

        await connection.execute(`
          INSERT INTO job_matches 
          (id, user_id, job_title, company, location, salary, match_score, job_data, source)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          jobId, userId, job_title, company, location, salary,
          match_score, JSON.stringify(job_data || {}), source
        ]);
      }

      await connection.commit();
      connection.release();

      res.status(201).json({ 
        message: `${jobIds.length} job matches created successfully`,
        jobIds
      });

    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }

  } catch (error) {
    console.error('Create job matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark job as applied
router.post('/:id/apply', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const [result] = await pool.execute(
      'UPDATE job_matches SET applied_at = NOW() WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Increment job views
    await incrementJobViews(userId);

    res.json({ message: 'Job marked as applied' });

  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save job for later
router.post('/:id/save', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const [result] = await pool.execute(
      'UPDATE job_matches SET saved_at = NOW() WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job saved successfully' });

  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get saved jobs
router.get('/saved', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [savedJobs] = await pool.execute(`
      SELECT 
        id, job_title, company, location, salary, match_score, job_data, source,
        applied_at, saved_at, created_at
      FROM job_matches 
      WHERE user_id = ? AND saved_at IS NOT NULL
      ORDER BY saved_at DESC
    `, [userId]);

    // Parse job_data JSON
    const jobs = savedJobs.map(job => ({
      ...job,
      job_data: typeof job.job_data === 'string' ? JSON.parse(job.job_data) : job.job_data
    }));

    res.json({ jobs });

  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get applied jobs
router.get('/applied', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [appliedJobs] = await pool.execute(`
      SELECT 
        id, job_title, company, location, salary, match_score, job_data, source,
        applied_at, saved_at, created_at
      FROM job_matches 
      WHERE user_id = ? AND applied_at IS NOT NULL
      ORDER BY applied_at DESC
    `, [userId]);

    // Parse job_data JSON
    const jobs = appliedJobs.map(job => ({
      ...job,
      job_data: typeof job.job_data === 'string' ? JSON.parse(job.job_data) : job.job_data
    }));

    res.json({ jobs });

  } catch (error) {
    console.error('Get applied jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate sample jobs for user (for demo purposes)
router.post('/generate-sample', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Sample Bangladesh jobs
    const sampleJobs = [
      {
        job_title: 'Senior Software Engineer',
        company: 'BRAC Bank',
        location: 'Dhaka',
        salary: '৳80,000-120,000',
        match_score: 95,
        job_data: {
          type: 'Full-time',
          experience: '4-6 years',
          posted: '2 hours ago',
          deadline: '2024-02-15',
          description: 'Join our digital banking team to build next-generation financial applications.',
          requirements: ['5+ years experience', 'React/Node.js expertise', 'Banking domain knowledge'],
          benefits: ['Health insurance', 'Performance bonus', 'Flexible hours'],
          applyUrl: 'https://bdjobs.com/brac-bank-software-engineer'
        },
        source: 'BDJobs'
      },
      {
        job_title: 'Frontend Developer',
        company: 'Grameenphone',
        location: 'Dhaka',
        salary: '৳60,000-90,000',
        match_score: 88,
        job_data: {
          type: 'Full-time',
          experience: '2-4 years',
          posted: '5 hours ago',
          description: 'Build user-facing applications for millions of customers.',
          requirements: ['3+ years React', 'TypeScript proficiency', 'Mobile-first development'],
          benefits: ['International exposure', 'Learning budget', 'Modern office'],
          applyUrl: 'https://linkedin.com/jobs/grameenphone-frontend'
        },
        source: 'LinkedIn'
      },
      {
        job_title: 'Full Stack Developer',
        company: 'Pathao',
        location: 'Dhaka',
        salary: '৳70,000-100,000',
        match_score: 85,
        job_data: {
          type: 'Full-time',
          experience: '3-5 years',
          posted: '1 day ago',
          description: 'Help scale our logistics platform serving millions across Bangladesh.',
          requirements: ['Full-stack experience', 'React/Node.js', 'Database optimization'],
          benefits: ['Equity participation', 'Startup culture', 'Growth opportunities'],
          applyUrl: 'https://pathao.com/careers/fullstack-developer'
        },
        source: 'Company'
      }
    ];

    // Insert sample jobs
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const jobIds = [];

      for (const job of sampleJobs) {
        const jobId = uuidv4();
        jobIds.push(jobId);

        await connection.execute(`
          INSERT INTO job_matches 
          (id, user_id, job_title, company, location, salary, match_score, job_data, source)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          jobId, userId, job.job_title, job.company, job.location, job.salary,
          job.match_score, JSON.stringify(job.job_data), job.source
        ]);
      }

      await connection.commit();
      connection.release();

      res.json({ 
        message: `${jobIds.length} sample jobs generated successfully`,
        jobs: sampleJobs.map((job, index) => ({ ...job, id: jobIds[index] }))
      });

    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }

  } catch (error) {
    console.error('Generate sample jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
