const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Database Connected...');
        // Sync models
        await sequelize.sync();
        console.log('Models Synced...');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        // Do not exit process, let it try/fail gracefully or handle elsewhere if needed
    }
};

module.exports = { sequelize, connectDB };
