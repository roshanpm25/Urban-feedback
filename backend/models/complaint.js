// models/Complaint.js

const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    wardNo: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
      enum: ['Electricity', 'Water', 'Road', 'Garbage', 'Others'], // Optional: service control
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'In Progress', 'Resolved'], // Optional: restrict valid status
    },
    assignment: {
      team: String,
      notes: String,
    },
    statusProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    statusNote: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
