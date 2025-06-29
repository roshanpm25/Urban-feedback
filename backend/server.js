const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // This works only if router is properly exported
const complaintRoutes = require('./routes/complaints');
app.use('/api/complaints', complaintRoutes);


// DB connection and server
mongoose.connect('mongodb://localhost:27017/urban-feedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});
