const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config();

// Import DB
const db = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();

/* ================================
   🌐 MIDDLEWARES
================================ */

// CORS (IMPORTANT for Vercel → Render)
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

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   🛣️ ROUTES
================================ */

app.get('/', (req, res) => {
    res.send('NRCM CodeStorm Backend is running 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

/* ================================
   ❌ ERROR HANDLER (SAFE)
================================ */
app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    res.status(500).json({
        message: 'Internal Server Error'
    });
});

/* ================================
   🟢 START SERVER
================================ */

const PORT = process.env.PORT || 5000;

db.sync()
    .then(() => {
        console.log('✅ Database connected & synced');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ DB connection failed:', err);
    });
