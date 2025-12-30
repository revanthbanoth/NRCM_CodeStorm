const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Idea = require('../models/Idea');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');

/**
 * ==================================================
 * MULTER CONFIG (MEMORY STORAGE – RENDER SAFE)
 * ==================================================
 */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = /ppt|pptx|pdf/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);

        if (ext && mime) cb(null, true);
        else cb(new Error('Only PPT, PPTX, and PDF files are allowed'));
    }
});

/**
 * ==================================================
 * HEALTH CHECK
 * ==================================================
 */
router.get('/health', (req, res) => {
    res.json({ status: 'Events API is running ✅' });
});

/**
 * ==================================================
 * REGISTER
 * ==================================================
 */
router.post('/register', async (req, res) => {
    try {
        const registration = await Registration.create(req.body);
        res.status(201).json({ success: true, data: registration });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * ==================================================
 * SUBMIT IDEA
 * ==================================================
 */
router.post('/idea', upload.single('pptFile'), async (req, res) => {
    try {
        const ideaData = {
            ...req.body,
            pptName: req.file?.originalname || null,
            pptType: req.file?.mimetype || null,
            pptSize: req.file?.size || null
        };

        const idea = await Idea.create(ideaData);
        res.status(201).json({ success: true, data: idea });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * ==================================================
 * COUNT
 * ==================================================
 */
router.get('/count', async (req, res) => {
    try {
        const count = await Registration.count();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * ==================================================
 * ADMIN – REGISTRATIONS
 * ==================================================
 */
router.get('/registrations', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const registrations = await Registration.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * ==================================================
 * ADMIN – IDEAS
 * ==================================================
 */
router.get('/ideas', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const ideas = await Idea.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
