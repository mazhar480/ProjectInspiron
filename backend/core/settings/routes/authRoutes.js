const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../../models/user'); // Assuming you have a User model

const router = express.Router();

// JWT Secret (keep this secret and store securely)
const JWT_SECRET = "your_jwt_secret";

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    // Create JWT token (expires in 1 hour)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token back to the frontend
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
