const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db');
const Registration = require('./models/Registration');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.use('/api/registrations', registrationRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await sequelize.sync(); // creates table if not exists

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
