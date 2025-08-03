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

// Helper function to increment usage
const incrementUsage = async (userId, field) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  await pool.execute(`
    INSERT INTO usage_stats (id, user_id, month_year, ${field}) 
    VALUES (?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE 
    ${field} = ${field} + 1,
    last_updated = NOW()
  `, [uuidv4(), userId, currentMonth]);
};

// Get all resumes for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [resumes] = await pool.execute(`
      SELECT 
        r.id, r.title, r.template_id, r.ats_score, r.status, r.created_at, r.updated_at,
        COUNT(rr.id) as revision_count
      FROM resumes r
      LEFT JOIN resume_revisions rr ON r.id = rr.resume_id
      WHERE r.user_id = ?
      GROUP BY r.id, r.title, r.template_id, r.ats_score, r.status, r.created_at, r.updated_at
      ORDER BY r.updated_at DESC
    `, [userId]);

    res.json({ resumes });

  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single resume
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const [resumes] = await pool.execute(
      'SELECT * FROM resumes WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (resumes.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Get revision history
    const [revisions] = await pool.execute(
      'SELECT * FROM resume_revisions WHERE resume_id = ? ORDER BY revision_number DESC',
      [id]
    );

    const resume = resumes[0];
    resume.revisions = revisions;

    res.json({ resume });

  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new resume
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content, template_id, ats_score } = req.body;
    const userId = req.userId;

    // Check user's resume limit
    const [userLimits] = await pool.execute(`
      SELECT p.resume_limit, COALESCE(us.resumes_created, 0) as current_count
      FROM user_subscriptions sub
      JOIN packages p ON sub.package_id = p.id
      LEFT JOIN usage_stats us ON sub.user_id = us.user_id 
        AND us.month_year = DATE_FORMAT(NOW(), '%Y-%m')
      WHERE sub.user_id = ? AND sub.status = 'active'
    `, [userId]);

    if (userLimits.length > 0) {
      const { resume_limit, current_count } = userLimits[0];
      if (resume_limit !== -1 && current_count >= resume_limit) {
        return res.status(403).json({ 
          error: 'Resume limit reached for your current package',
          limit: resume_limit,
          current: current_count
        });
      }
    }

    const resumeId = uuidv4();

    await pool.execute(
      'INSERT INTO resumes (id, user_id, title, content, template_id, ats_score, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [resumeId, userId, title, JSON.stringify(content), template_id, ats_score, 'draft']
    );

    // Increment usage
    await incrementUsage(userId, 'resumes_created');

    res.status(201).json({ 
      message: 'Resume created successfully',
      resume: {
        id: resumeId,
        title,
        template_id,
        ats_score,
        status: 'draft'
      }
    });

  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update resume
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, template_id, ats_score, status } = req.body;
    const userId = req.userId;

    // Verify resume ownership
    const [resumes] = await pool.execute(
      'SELECT id FROM resumes WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (resumes.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Update resume
    await pool.execute(`
      UPDATE resumes 
      SET title = COALESCE(?, title),
          content = COALESCE(?, content),
          template_id = COALESCE(?, template_id),
          ats_score = COALESCE(?, ats_score),
          status = COALESCE(?, status),
          updated_at = NOW()
      WHERE id = ?
    `, [title, content ? JSON.stringify(content) : null, template_id, ats_score, status, id]);

    res.json({ message: 'Resume updated successfully' });

  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create resume revision
router.post('/:id/revisions', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { changes } = req.body;
    const userId = req.userId;

    // Check revision limit
    const [userLimits] = await pool.execute(`
      SELECT p.revision_limit, COALESCE(us.revisions_used, 0) as current_count
      FROM user_subscriptions sub
      JOIN packages p ON sub.package_id = p.id
      LEFT JOIN usage_stats us ON sub.user_id = us.user_id 
        AND us.month_year = DATE_FORMAT(NOW(), '%Y-%m')
      WHERE sub.user_id = ? AND sub.status = 'active'
    `, [userId]);

    if (userLimits.length > 0) {
      const { revision_limit, current_count } = userLimits[0];
      if (revision_limit !== -1 && current_count >= revision_limit) {
        return res.status(403).json({ 
          error: 'Revision limit reached for your current package',
          limit: revision_limit,
          current: current_count
        });
      }
    }

    // Verify resume ownership
    const [resumes] = await pool.execute(
      'SELECT id FROM resumes WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (resumes.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Get next revision number
    const [revisionCount] = await pool.execute(
      'SELECT COALESCE(MAX(revision_number), 0) + 1 as next_revision FROM resume_revisions WHERE resume_id = ?',
      [id]
    );

    const revisionNumber = revisionCount[0].next_revision;
    const revisionId = uuidv4();

    await pool.execute(
      'INSERT INTO resume_revisions (id, resume_id, user_id, changes, revision_number) VALUES (?, ?, ?, ?, ?)',
      [revisionId, id, userId, JSON.stringify(changes), revisionNumber]
    );

    // Increment usage
    await incrementUsage(userId, 'revisions_used');

    res.status(201).json({ 
      message: 'Revision created successfully',
      revision: {
        id: revisionId,
        revision_number: revisionNumber
      }
    });

  } catch (error) {
    console.error('Create revision error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete resume
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const [result] = await pool.execute(
      'DELETE FROM resumes WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });

  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
