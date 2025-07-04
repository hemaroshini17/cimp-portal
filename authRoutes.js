const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dummysecret';

// Dummy LOGIN route – allows any email, password, and role
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  // Simulate user from email
  const dummyUser = {
    _id: 'dummy-' + Date.now(),
    name: email.split('@')[0],
    email,
    role: role.toLowerCase()
  };

  // Create token
  const token = jwt.sign(
    { userId: dummyUser._id, role: dummyUser.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return res.status(200).json({
    token,
    user: dummyUser
  });
});

module.exports = router;
