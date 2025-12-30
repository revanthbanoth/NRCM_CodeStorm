const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

/**
 * =================================================
 * Sequelize Connection (MySQL / TiDB Compatible)
 * =================================================
 */
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

/**
 * =================================================
 * DB Connect Function
 * =================================================
 */
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');

        await sequelize.sync({ alter: false });
        console.log('✅ Models synced successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error; // IMPORTANT for Render to detect failure
    }
};

/**
 * =================================================
 * EXPORTS (IMPORTANT)
 * =================================================
 * Export sequelize directly (NOT as object)
 */
module.exports = sequelize;
module.exports.connectDB = connectDB;
