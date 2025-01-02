const TravelPackage = require('../models/TravelPackage');

async function getAllPackages() {
  return await TravelPackage.find();
}

async function getPackageByDestination(destination) {
  return await TravelPackage.findOne({ destination });
}

async function updateAvailableSlots(packageId, seatsBooked) {
  const travelPackage = await TravelPackage.findOne({ packageId });

  if (!travelPackage) {
    throw new Error("Travel package not found");
  }

  if (travelPackage.availableSlots < seatsBooked) {
    throw new Error('Not enough available slots');
  }

  travelPackage.availableSlots -= seatsBooked;
  return await travelPackage.save();
}

module.exports = {
  getAllPackages,
  getPackageByDestination,
  updateAvailableSlots
};
