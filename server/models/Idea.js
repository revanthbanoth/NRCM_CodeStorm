const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Idea = sequelize.define(
    'Idea',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
            allowNull: true
        },
        pptName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pptType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pptSize: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        tableName: 'Ideas',
        timestamps: false
    }
);

module.exports = Idea;
