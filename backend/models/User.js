// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Enforces uniqueness at DB level
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'], // Basic regex validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // You can increase this
  },
  role: {
    type: String,
    enum: ['user', 'wardAdmin', 'superAdmin'],
    default: 'user',
  },
  wardNo: {
    type: String,
    default: '', // Ward not needed for superAdmin
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
