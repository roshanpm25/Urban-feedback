const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/all', auth, authorize(['superAdmin']), async (req, res) => {
  const users = await User.find().select('-password'); // Exclude passwords
  res.json(users);
});

module.exports = router;
