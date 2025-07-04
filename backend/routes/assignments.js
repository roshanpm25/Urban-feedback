const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Complaint = require('../models/Complaint');

// Assign team to a complaint (and update complaint's assignment field)
router.post('/:complaintId', async (req, res) => {
  const { complaintId } = req.params;
  const { team, notes } = req.body;

  try {
    // ✅ 1. Save assignment as separate document
    const assignment = new Assignment({ complaintId, team, notes });
    await assignment.save();

    // ✅ 2. Update the complaint's embedded assignment field
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignment: {
          team,
          notes
        },
        status: 'Assigned' // Optional: auto-update status
      },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({
      message: 'Team assigned successfully',
      assignment,
      updatedComplaint
    });
  } catch (err) {
    console.error('Assignment Error:', err.message);
    res.status(500).json({ error: 'Failed to assign team' });
  }
});

module.exports = router;
