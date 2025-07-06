const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  username: String,
  email: String,
  wardNo: String,
  service: String,
  phone: String,
  description: String,
  address: String,
  imagePath: String, // ✅ new field
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Pending'
  },
  statusProgress: {
    type: Number,
    default: 0
  },
  statusNote: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
