const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Idea = require('../models/Idea');

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
router.post('/idea', async (req, res) => {
    try {
        const { user, ...rest } = req.body;
        const ideaData = { ...rest };
        if (user) ideaData.userId = user;

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
router.get('/registrations', async (req, res) => {
    try {
        const registrations = await Registration.findAll({});
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all ideas (Admin)
// @route   GET /api/events/ideas
router.get('/ideas', async (req, res) => {
    try {
        const ideas = await Idea.findAll({});
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
