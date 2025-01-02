const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const travelPackageRoutes = require('./routes/travelPackageRoutes');
const bookingRoute = require('./routes/bookingRoutes');
const seederRoute = require('./routes/seedingRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', travelPackageRoutes);
app.use('/bookings', bookingRoute);
app.use('/seeders', seederRoute);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

module.exports = { app, startServer, connectDB };
