const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

/**
 * =================================================
 * TiDB Cloud uses SINGLE DATABASE_URL
 * =================================================
 * Example:
 * mysql://username:password@host:4000/database
 */
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to TiDB Cloud successfully');

    await sequelize.sync({ alter: false });
    console.log('✅ Models synced');

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error; // IMPORTANT: let Render know it failed
  }
};

module.exports = { sequelize, connectDB };
