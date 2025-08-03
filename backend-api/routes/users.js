const express = require('express');
const jwt = require('jsonwebtoken');
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

// Complete onboarding
router.post('/onboarding', verifyToken, async (req, res) => {
  try {
    const { career_goal, experience_level, industry, location } = req.body;
    const userId = req.userId;

    await pool.execute(`
      UPDATE user_profiles 
      SET career_goal = ?, experience_level = ?, industry = ?, location = ?, onboarding_completed = TRUE
      WHERE user_id = ?
    `, [career_goal, experience_level, industry, location, userId]);

    res.json({ message: 'Onboarding completed successfully' });

  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get dashboard data
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Get user dashboard data using the view
    const [dashboardData] = await pool.execute(
      'SELECT * FROM user_dashboard_data WHERE id = ?',
      [userId]
    );

    if (dashboardData.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get recent resumes
    const [resumes] = await pool.execute(`
      SELECT id, title, ats_score, status, created_at, updated_at
      FROM resumes 
      WHERE user_id = ? 
      ORDER BY updated_at DESC 
      LIMIT 5
    `, [userId]);

    // Get recent job matches
    const [jobMatches] = await pool.execute(`
      SELECT id, job_title, company, location, salary, match_score, source, created_at
      FROM job_matches 
      WHERE user_id = ? 
      ORDER BY match_score DESC 
      LIMIT 10
    `, [userId]);

    const user = dashboardData[0];
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        onboarding_completed: user.onboarding_completed,
        career_goal: user.career_goal,
        experience_level: user.experience_level,
        industry: user.industry,
        location: user.location
      },
      package: {
        id: user.package_id,
        name: user.package_name,
        price_bdt: user.price_bdt,
        billing_period: user.billing_period,
        resume_limit: user.resume_limit,
        revision_limit: user.revision_limit,
        job_match_limit: user.job_match_limit,
        features: user.features
      },
      usage: {
        resumes_created: user.resumes_created,
        revisions_used: user.revisions_used,
        jobs_viewed: user.jobs_viewed
      },
      resumes,
      jobMatches
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { full_name, phone, career_goal, experience_level, industry, location } = req.body;
    const userId = req.userId;

    // Update user basic info
    if (full_name || phone) {
      await pool.execute(
        'UPDATE users SET full_name = COALESCE(?, full_name), phone = COALESCE(?, phone) WHERE id = ?',
        [full_name, phone, userId]
      );
    }

    // Update profile info
    if (career_goal || experience_level || industry || location) {
      await pool.execute(`
        UPDATE user_profiles 
        SET career_goal = COALESCE(?, career_goal), 
            experience_level = COALESCE(?, experience_level),
            industry = COALESCE(?, industry), 
            location = COALESCE(?, location)
        WHERE user_id = ?
      `, [career_goal, experience_level, industry, location, userId]);
    }

    res.json({ message: 'Profile updated successfully' });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get usage statistics
router.get('/usage', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const [usage] = await pool.execute(
      'SELECT * FROM usage_stats WHERE user_id = ? AND month_year = ?',
      [userId, currentMonth]
    );

    if (usage.length === 0) {
      // Create usage record if it doesn't exist
      const { v4: uuidv4 } = require('uuid');
      await pool.execute(
        'INSERT INTO usage_stats (id, user_id, month_year, resumes_created, revisions_used, jobs_viewed) VALUES (?, ?, ?, 0, 0, 0)',
        [uuidv4(), userId, currentMonth]
      );
      
      res.json({
        resumes_created: 0,
        revisions_used: 0,
        jobs_viewed: 0,
        month_year: currentMonth
      });
    } else {
      res.json(usage[0]);
    }

  } catch (error) {
    console.error('Usage stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
