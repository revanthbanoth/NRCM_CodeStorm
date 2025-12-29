const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// Routes
// =====================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// =====================
// Start Server AFTER DB Connects
// =====================
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Server not started due to DB error');
  });
