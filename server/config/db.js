const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false,
        }
    );

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connected...');
        // Sync ALL models here to ensure tables exist
        await sequelize.sync({ alter: true }); // updates schema if changed
        console.log('Database Synced...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
