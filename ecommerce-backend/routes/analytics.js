const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const pool = require('../db');

// Claim: SQL Aggregation Queries
router.get('/revenue', verifyToken, async (req, res) => {
  try {
    // Only admins can see total revenue (RBAC Claim)
    if (req.user.role !== 'admin') return res.status(403).json({ error: "Access denied" });

    const query = `
      SELECT 
        DATE(created_at) as sale_date, 
        COUNT(*) as total_orders, 
        SUM(total_amount) as daily_revenue
      FROM orders
      WHERE status = 'completed'
      GROUP BY DATE(created_at)
      ORDER BY sale_date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;