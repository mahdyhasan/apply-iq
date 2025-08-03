const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const { pool } = require('../config/database');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, plan = 'free' } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = uuidv4();
    const fullName = `${firstName} ${lastName}`;

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Create user
      await connection.execute(
        'INSERT INTO users (id, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
        [userId, email, hashedPassword, fullName]
      );

      // Create user profile
      await connection.execute(
        'INSERT INTO user_profiles (id, user_id, onboarding_completed) VALUES (?, ?, ?)',
        [uuidv4(), userId, false]
      );

      // Assign free package
      await connection.execute(
        'INSERT INTO user_subscriptions (id, user_id, package_id, status) VALUES (?, ?, ?, ?)',
        [uuidv4(), userId, plan, 'active']
      );

      // Initialize usage stats
      const currentMonth = new Date().toISOString().slice(0, 7);
      await connection.execute(
        'INSERT INTO usage_stats (id, user_id, month_year, resumes_created, revisions_used, jobs_viewed) VALUES (?, ?, ?, ?, ?, ?)',
        [uuidv4(), userId, currentMonth, 0, 0, 0]
      );

      await connection.commit();
      connection.release();

      // Generate token
      const token = generateToken(userId);

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: userId,
          email,
          full_name: fullName,
          onboarding_completed: false
        }
      });

    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user with profile and subscription data
    const [users] = await pool.execute(`
      SELECT 
        u.id, u.email, u.password_hash, u.full_name,
        up.onboarding_completed, up.career_goal, up.experience_level, up.industry, up.location,
        us.package_id,
        p.name as package_name, p.price_bdt, p.billing_period
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
      LEFT JOIN packages p ON us.package_id = p.id
      WHERE u.email = ?
    `, [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        onboarding_completed: user.onboarding_completed,
        career_goal: user.career_goal,
        experience_level: user.experience_level,
        industry: user.industry,
        location: user.location,
        package: {
          id: user.package_id,
          name: user.package_name,
          price_bdt: user.price_bdt,
          billing_period: user.billing_period
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const [users] = await pool.execute(`
      SELECT 
        u.id, u.email, u.full_name,
        up.onboarding_completed, up.career_goal, up.experience_level, up.industry, up.location,
        us.package_id,
        p.name as package_name, p.price_bdt, p.billing_period, p.resume_limit, p.revision_limit, p.job_match_limit
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
      LEFT JOIN packages p ON us.package_id = p.id
      WHERE u.id = ?
    `, [userId]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    res.json({ user });

  } catch (error) {
    console.error('Profile error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
