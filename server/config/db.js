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
    console.log('✅ TiDB Connected');
  } catch (error) {
    console.error('❌ DB Connection Failed:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
