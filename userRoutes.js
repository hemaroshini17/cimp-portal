const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get users by role
router.get('/roles', async (req, res) => {
  try {
    const presidents = await User.find({ role: 'president' });
    const faculties = await User.find({ role: 'faculty' });
    res.json({ presidents, faculties });
  } catch (err) {
    res.status(500).json({ msg: 'Server error fetching users' });
  }
});

module.exports = router;
