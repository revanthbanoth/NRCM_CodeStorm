const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Register event (already working)
router.post('/register', async (req, res) => {
  try {
    const data = await Registration.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUBLIC – GET ALL REGISTRATIONS (NO AUTH)
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

module.exports = router;
