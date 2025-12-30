const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Registration = sequelize.define('Registration', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teamName: {
        type: DataTypes.STRING
    },
    teamMembers: {
        type: DataTypes.TEXT // Changed to TEXT in case list is long
    },
});

module.exports = Registration;
