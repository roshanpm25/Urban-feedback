const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// 📌 POST: Register a new complaint
router.post('/', async (req, res) => {
  try {
    const { username, email, wardNo, service, phone, description } = req.body;

    if (!username || !email || !wardNo || !service || !phone || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newComplaint = new Complaint({
      username,
      email,
      wardNo,
      service,
      phone,
      description
    });

    const savedComplaint = await newComplaint.save();
    console.log("✅ Complaint Registered:", savedComplaint._id);
    res.status(201).json(savedComplaint);
  } catch (err) {
    console.error("❌ Error saving complaint:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 📌 GET: All complaints by user
router.get('/user/:username', async (req, res) => {
  try {
    const complaints = await Complaint.find({ username: req.params.username });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user complaints' });
  }
});

// 📌 GET: All complaints by ward
router.get('/ward/:wardNo', async (req, res) => {
  try {
    const complaints = await Complaint.find({ wardNo: req.params.wardNo });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ward complaints' });
  }
});

// 📌 GET: Complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 📌 POST: Assign team members (in-complaint model)
router.post('/assignments/:id', async (req, res) => {
  const { team, notes } = req.body;
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

    complaint.assignment = { team, notes };
    await complaint.save();

    res.json({ success: true, message: 'Team assigned successfully' });
  } catch (err) {
    console.error("❌ Assignment Error:", err);
    res.status(500).json({ error: 'Assignment failed' });
  }
});

// 📌 PUT: Update progress and notes
router.put('/status/:id', async (req, res) => {
  const { statusProgress, statusNote } = req.body;

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { statusProgress, statusNote },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(updatedComplaint);
  } catch (err) {
    console.error("❌ Status Update Error:", err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
