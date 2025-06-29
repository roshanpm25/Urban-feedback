const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');

// 🔹 Create a complaint
router.post('/', async (req, res) => {
  try {
    const { username, service, description, phone, wardNo } = req.body;

    const newComplaint = new Complaint({
      username,
      serviceType: service,
      description,
      phone,
      wardNo
    });

    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

// 🔹 Get complaints by username
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const complaints = await Complaint.find({ username }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// ✅ Get complaints by wardNo
router.get('/ward/:wardNo', async (req, res) => {
  try {
    const { wardNo } = req.params;
    const complaints = await Complaint.find({ wardNo }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ward complaints' });
  }
});

router.post('/api/complaints', async (req, res) => {
  try {
    const { username, service, description, phone, wardNo } = req.body;

    if (!username || !service || !description || !phone || !wardNo) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const complaint = new Complaint({ username, service, description, phone, wardNo });
    await complaint.save();

    res.status(201).json({ message: 'Complaint submitted' });
  } catch (error) {
    console.error('❌ Complaint Submission Error:', error.message);
    res.status(500).json({ error: 'Server error while submitting complaint' });
  }
});

module.exports = router;
