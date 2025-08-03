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

// Get all available packages
router.get('/', async (req, res) => {
  try {
    const [packages] = await pool.execute(
      'SELECT id, name, price_bdt, billing_period, resume_limit, revision_limit, job_match_limit, features FROM packages WHERE is_active = TRUE ORDER BY price_bdt'
    );

    res.json({ packages });

  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user subscription
router.get('/current', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [subscriptions] = await pool.execute(`
      SELECT 
        us.id, us.package_id, us.status, us.start_date, us.end_date, us.payment_method,
        p.name, p.price_bdt, p.billing_period, p.resume_limit, p.revision_limit, p.job_match_limit, p.features
      FROM user_subscriptions us
      JOIN packages p ON us.package_id = p.id
      WHERE us.user_id = ? AND us.status = 'active'
    `, [userId]);

    if (subscriptions.length === 0) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    res.json({ subscription: subscriptions[0] });

  } catch (error) {
    console.error('Get current subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upgrade/change package
router.post('/upgrade', verifyToken, async (req, res) => {
  try {
    const { package_id, payment_method, transaction_id, amount_bdt } = req.body;
    const userId = req.userId;

    if (!package_id || !payment_method) {
      return res.status(400).json({ error: 'Package ID and payment method are required' });
    }

    // Verify package exists
    const [packages] = await pool.execute(
      'SELECT id, name, price_bdt FROM packages WHERE id = ? AND is_active = TRUE',
      [package_id]
    );

    if (packages.length === 0) {
      return res.status(400).json({ error: 'Invalid package selected' });
    }

    const package = packages[0];

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // End current subscription
      await connection.execute(
        'UPDATE user_subscriptions SET status = ?, end_date = NOW() WHERE user_id = ? AND status = ?',
        ['cancelled', userId, 'active']
      );

      // Create new subscription
      const subscriptionId = uuidv4();
      await connection.execute(
        'INSERT INTO user_subscriptions (id, user_id, package_id, status, payment_method, transaction_id) VALUES (?, ?, ?, ?, ?, ?)',
        [subscriptionId, userId, package_id, 'active', payment_method, transaction_id]
      );

      // Record payment transaction
      if (amount_bdt && amount_bdt > 0) {
        await connection.execute(
          'INSERT INTO payment_transactions (id, user_id, subscription_id, amount_bdt, payment_method, transaction_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [uuidv4(), userId, subscriptionId, amount_bdt, payment_method, transaction_id, 'completed']
        );
      }

      await connection.commit();
      connection.release();

      res.json({ 
        message: 'Package upgraded successfully',
        subscription: {
          id: subscriptionId,
          package_id,
          package_name: package.name,
          price_bdt: package.price_bdt
        }
      });

    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }

  } catch (error) {
    console.error('Package upgrade error:', error);
    res.status(500).json({ error: 'Internal server error during package upgrade' });
  }
});

// Get subscription history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [subscriptions] = await pool.execute(`
      SELECT 
        us.id, us.package_id, us.status, us.start_date, us.end_date, us.payment_method,
        p.name, p.price_bdt, p.billing_period
      FROM user_subscriptions us
      JOIN packages p ON us.package_id = p.id
      WHERE us.user_id = ?
      ORDER BY us.start_date DESC
    `, [userId]);

    res.json({ subscriptions });

  } catch (error) {
    console.error('Get subscription history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get payment history
router.get('/payments', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [payments] = await pool.execute(`
      SELECT 
        pt.id, pt.amount_bdt, pt.payment_method, pt.transaction_id, pt.status, pt.created_at,
        p.name as package_name
      FROM payment_transactions pt
      LEFT JOIN user_subscriptions us ON pt.subscription_id = us.id
      LEFT JOIN packages p ON us.package_id = p.id
      WHERE pt.user_id = ?
      ORDER BY pt.created_at DESC
    `, [userId]);

    res.json({ payments });

  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel subscription
router.post('/cancel', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Cancel current subscription and assign free package
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // End current subscription
      await connection.execute(
        'UPDATE user_subscriptions SET status = ?, end_date = NOW() WHERE user_id = ? AND status = ?',
        ['cancelled', userId, 'active']
      );

      // Assign free package
      await connection.execute(
        'INSERT INTO user_subscriptions (id, user_id, package_id, status) VALUES (?, ?, ?, ?)',
        [uuidv4(), userId, 'free', 'active']
      );

      await connection.commit();
      connection.release();

      res.json({ message: 'Subscription cancelled successfully, downgraded to free plan' });

    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }

  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
