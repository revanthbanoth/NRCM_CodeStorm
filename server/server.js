const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
connectDB();

/**
 * =====================
 * TRUST PROXY (RENDER)
 * =====================
 */
app.set('trust proxy', 1);

/**
 * =====================
 * MIDDLEWARE
 * =====================
 */
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://nrcm-code-storm.vercel.app'
    ],
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * =====================
 * ROUTES
 * =====================
 */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

/**
 * =====================
 * HEALTH CHECKS
 * =====================
 */
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is healthy ✅' });
});

/**
 * =====================
 * 404 HANDLER
 * =====================
 */
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`
  });
});

/**
 * =====================
 * GLOBAL ERROR HANDLER
 * =====================
 */
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

/**
 * =====================
 * START SERVER (AFTER DB)
 * =====================
 */
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Server not started due to DB error:', err.message);
  });
