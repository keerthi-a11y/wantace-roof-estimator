const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

const router = express.Router();

// Owner login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    const owner = await Owner.findOne({ username });

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      owner.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const token = jwt.sign(
      {
        ownerId: owner._id,
        username: owner.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
});

module.exports = router;