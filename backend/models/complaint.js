const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  username: { type: String, required: true },
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String },
  wardNo: { type: String , required: true},
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
