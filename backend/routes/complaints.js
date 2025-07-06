
const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const path = require('path');
const Complaint = require('../models/Complaint');



// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder name
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route to handle complaint with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { username, email, wardNo, service, phone, description, address } = req.body;

    const newComplaint = new Complaint({
      username,
      email,
      wardNo,
      service,
      phone,
      description,
      address,
      imagePath: req.file ? 'uploads/' + req.file.filename : null,
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



//  GET: All complaints by user
router.get('/user/:username', async (req, res) => {
  try {
    const complaints = await Complaint.find({ username: req.params.username });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user complaints' });
  }
});

//  GET: All complaints by ward
router.get('/ward/:wardNo', async (req, res) => {
  try {
    const complaints = await Complaint.find({ wardNo: req.params.wardNo });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ward complaints' });
  }
});

//  GET: Complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//  POST: Assign team members (in-complaint model)
// Assign team
router.post('/assignments/:id', async (req, res) => {
  const { team, notes } = req.body;
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

  complaint.assignment = { team, notes };
  await complaint.save();
  res.json({ success: true, message: 'Team assigned successfully' });
});



router.put('/status/:id', async (req, res) => {
  const { statusProgress, statusNote } = req.body;

  try {
    let newStatus = 'Pending';

    if (statusProgress >= 100) {
      newStatus = 'Resolved';
    } else if (statusProgress > 0) {
      newStatus = 'In Progress';
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        statusProgress,
        statusNote,
        status: newStatus  //  update status dynamically
      },
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
