const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ Import your routes
const complaintRoutes = require('./routes/complaints'); 

const app = express();
app.use(cors());
app.use(express.json());
const complaintsRoute = require('./routes/complaints');
app.use(express.json()); // ✅ Needed to parse JSON bodies
app.use('/api/complaints', complaintRoutes);


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/assignments', require('./routes/assignments'));



// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
