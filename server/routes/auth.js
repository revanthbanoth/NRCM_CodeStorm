const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * ===============================
 * GENERATE JWT TOKEN
 * ===============================
 */
const generateToken = (id, isAdmin = false) => {
    return jwt.sign(
        { id, isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

/**
 * ===============================
 * REGISTER USER (NORMAL USERS)
 * POST /api/auth/register
 * ===============================
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check existing user
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            isAdmin: false
        });

        // Response
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: false,
            token: generateToken(user.id, false)
        });

    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

/**
 * ===============================
 * LOGIN (ADMIN + USER)
 * POST /api/auth/login
 * ===============================
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt: ${email}`);

        /**
         * ===============================
         * ADMIN LOGIN (ENV BASED)
         * ===============================
         */
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            console.log('Admin login successful');

            return res.json({
                _id: 'admin',
                name: 'Admin',
                email,
                isAdmin: true,
                token: generateToken('admin', true)
            });
        }

        /**
         * ===============================
         * NORMAL USER LOGIN
         * ===============================
         */
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Success response
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin || false,
            token: generateToken(user.id, user.isAdmin || false)
        });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
