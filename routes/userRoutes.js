// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
