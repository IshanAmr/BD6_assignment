const mongoose = require('mongoose');

const travelPackageSchema = new mongoose.Schema({
  packageId: { type: Number, required: true, unique: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
});

module.exports = mongoose.model('TravelPackage', travelPackageSchema);
