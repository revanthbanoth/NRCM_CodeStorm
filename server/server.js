const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');

// ROUTES (ONLY EXISTING ONES)
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend running successfully 🚀');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// DB + Server start
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
  });
