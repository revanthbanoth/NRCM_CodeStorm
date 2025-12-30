const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ✅ IMPORTANT: file names must MATCH exactly (case-sensitive)
const Registration = require('../models/Registration');
const Idea = require('../models/Idea');
const { protect } = require('../middleware/authMiddleware');

/* ==================================================
   MULTER CONFIG (RENDER SAFE)
================================================== */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowed = /ppt|pptx|pdf/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) cb(null, true);
        else cb(new Error('Only PPT, PPTX, PDF allowed'));
    }
});

/* ==================================================
   HEALTH CHECK
================================================== */
router.get('/health', (req, res) => {
    res.json({ status: 'Events API is running ✅' });
});

/* ==================================================
   REGISTER EVENT
================================================== */
router.post('/register', async (req, res) => {
    try {
        const registration = await Registration.create(req.body);
        res.status(201).json(registration);
    } catch (error) {
        console.error('Register error:', error);
        res.status(400).json({ message: error.message });
    }
});

/* ==================================================
   SUBMIT IDEA
================================================== */
router.post('/idea', upload.single('pptFile'), async (req, res) => {
    try {
        const ideaData = {
            ...req.body,
            pptName: req.file ? req.file.originalname : null,
            pptType: req.file ? req.file.mimetype : null,
            pptSize: req.file ? req.file.size : null
        };

        const idea = await Idea.create(ideaData);
        res.status(201).json(idea);
    } catch (error) {
        console.error('Idea submit error:', error);
        res.status(400).json({ message: error.message });
    }
});

/* ==================================================
   COUNT REGISTRATIONS
================================================== */
router.get('/count', async (req, res) => {
    try {
        const count = await Registration.count();
        res.json({ count });
    } catch (error) {
        console.error('Count error:', error);
        res.status(500).json({ message: error.message });
    }
});

/* ==================================================
   ADMIN – REGISTRATIONS (TOKEN REQUIRED)
================================================== */
router.get('/registrations', protect, async (req, res) => {
    try {
        const registrations = await Registration.findAll();
        res.json(registrations);
    } catch (error) {
        console.error('Registrations fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch registrations' });
    }
});

/* ==================================================
   ADMIN – IDEAS (TOKEN REQUIRED)
================================================== */
router.get('/ideas', protect, async (req, res) => {
    try {
        const ideas = await Idea.findAll();
        res.json(ideas);
    } catch (error) {
        console.error('Ideas fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch ideas' });
    }
});

module.exports = router;
