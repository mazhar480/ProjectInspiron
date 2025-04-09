const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const User = require('../../../models/user');

const router = express.Router();

// Protect user management routes
router.use(verifyToken); // Apply token verification to all routes below

// Get all users (protected route)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
