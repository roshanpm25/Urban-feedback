const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'wardAdmin', 'superAdmin'], default: 'user' },
  wardNo:   { type: String } // optional, only for wardAdmin
});

module.exports = mongoose.model('User', userSchema);
