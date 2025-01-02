const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: Number, required: true, unique: true },
  packageId: { type: Number, required: true },
  customerName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  seats: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
