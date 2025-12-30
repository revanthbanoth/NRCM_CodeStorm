const { Sequelize } = require('sequelize');
require('dotenv').config();

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
    console.log('✅ Connected to TiDB Cloud');

    await sequelize.sync(); // IMPORTANT
    console.log('✅ Models synced');
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  }
};

module.exports = sequelize;   // ⚠️ EXPORT ONLY sequelize
module.exports.connectDB = connectDB;
