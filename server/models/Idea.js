const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Idea = sequelize.define('Idea', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leaderEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projectTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: false
    },
    problemStatement: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    solutionDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    techStack: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    },
    pptPath: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Idea;
