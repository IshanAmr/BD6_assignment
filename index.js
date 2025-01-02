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

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
