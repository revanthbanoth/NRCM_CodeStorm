const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Idea = require('../models/Idea');
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /ppt|pptx|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only PPT, PPTX, and PDF files are allowed!'));
        }
    }
});

// @desc    Register for event
// @route   POST /api/events/register
router.post('/register', async (req, res) => {
    try {
        const { user, ...rest } = req.body;
        const registrationData = { ...rest };
        if (user) registrationData.userId = user;

        const registration = await Registration.create(registrationData);
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Submit Idea
// @route   POST /api/events/idea
router.post('/idea', upload.single('pptFile'), async (req, res) => {
    try {
        const { user, ...rest } = req.body; // user might be undefined if not sent, which is fine
        const ideaData = { ...rest };
        if (user) ideaData.userId = user;
        if (req.file) ideaData.pptPath = req.file.path.replace(/\\/g, "/"); // Store path with forward slashes

        const idea = await Idea.create(ideaData);
        res.status(201).json(idea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get registration count
// @route   GET /api/events/count
router.get('/count', async (req, res) => {
    try {
        const count = await Registration.count();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all registrations (Admin)
// @route   GET /api/events/registrations
router.get('/registrations', protect, admin, async (req, res) => {
    try {
        const registrations = await Registration.findAll({});
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all ideas (Admin)
// @route   GET /api/events/ideas
router.get('/ideas', protect, admin, async (req, res) => {
    try {
        const ideas = await Idea.findAll({});
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
