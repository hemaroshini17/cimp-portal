const express = require('express');
const Club = require('../models/Club');
const User = require('../models/User');
const router = express.Router();

// Create Club
router.post('/', async (req, res) => {
  try {
    const { name, description, category, president, facultyCoordinator } = req.body;
    const club = new Club({ name, description, category, president, facultyCoordinator, members: [] });
    await club.save();
    res.status(201).json({ msg: 'Club created successfully', club });
  } catch (err) {
    res.status(500).json({ msg: 'Server error creating club' });
  }
});

// Get All Clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate('president', 'name email')
      .populate('facultyCoordinator', 'name email')
      .populate('members', 'name email');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching clubs' });
  }
});

// Delete Club
router.delete('/:id', async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Club deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting club' });
  }
});

// Update Club
router.put('/:id', async (req, res) => {
  const { name, description, category, president, facultyCoordinator } = req.body;
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, {
      name, description, category, president, facultyCoordinator
    }, { new: true });
    res.json({ msg: 'Club updated', club });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating club' });
  }
});

// Get Club Members
router.get('/:id/members', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate('members', 'name email');
    res.json(club.members);
  } catch (err) {
    res.status(500).json({ msg: 'Error getting members' });
  }
});

// Add Member
router.post('/:id/add-member', async (req, res) => {
  const { memberId } = req.body;
  try {
    const club = await Club.findById(req.params.id);
    if (!club.members.includes(memberId)) {
      club.members.push(memberId);
      await club.save();
    }
    res.json({ msg: 'Member added' });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding member' });
  }
});

// Remove Member
router.delete('/:id/remove-member/:memberId', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    club.members = club.members.filter(m => m.toString() !== req.params.memberId);
    await club.save();
    res.json({ msg: 'Member removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Error removing member' });
  }
});

module.exports = router;
