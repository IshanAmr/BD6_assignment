const TravelPackage = require('../models/TravelPackage');
const Booking = require('../models/Booking');

async function seedPackages(req, res) {
  const packages = req.body;
  try {
    await TravelPackage.insertMany(packages);
    res.status(201).json({ message: 'Travel packages seeded successfully', packages });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding travel packages', error: error.message });
  }
}

async function seedBookings(req, res) {
  const bookings = req.body;
  try {
    await Booking.insertMany(bookings);
    res.status(201).json({ message: 'Bookings seeded successfully', bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding bookings', error: error.message });
  }
}

module.exports = {
  seedPackages,
  seedBookings,
};
