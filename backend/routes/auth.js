const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  // Validate user, generate JWT token
});
module.exports = router;