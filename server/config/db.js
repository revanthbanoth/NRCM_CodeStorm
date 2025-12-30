const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

/**
 * =========================================
 * TiDB Cloud - DATABASE_URL connection
 * =========================================
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

    await sequelize.sync(); // keep simple
    console.log('✅ Models synced');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = { sequelize, connectDB };
