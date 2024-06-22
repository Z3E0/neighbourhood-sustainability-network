// server/routes/user.js
const express = require('express');
const User = require('../models/User');
const Neighbourhood = require('../models/Neighbourhood');
const router = express.Router();

// Get User Profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update User Profile
router.put('/profile/:id', async (req, res) => {
  const { neighbourhood, bio } = req.body;
  try {
    const user = await User.update({ neighbourhood, bio }, { where: { id: req.params.id } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

// Create Neighbourhood
router.post('/neighbourhood', async (req, res) => {
  const { name, description } = req.body;
  try {
    const neighbourhood = await Neighbourhood.create({ name, description });
    res.status(201).json({ message: 'Neighbourhood created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating neighbourhood' });
  }
});

module.exports = router;
