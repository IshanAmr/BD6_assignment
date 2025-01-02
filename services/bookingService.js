const Booking = require('../models/Booking');
const TravelPackage = require('../models/TravelPackage');

async function createBooking(bookingData) {
  const { packageId, seats } = bookingData;

  const travelPackage = await TravelPackage.findOne({ packageId });
  if (!travelPackage) {
    throw new Error('Travel package not found');
  }

  if (travelPackage.availableSlots < seats) {
    throw new Error('Not enough available slots');
  }

  const maxBooking = await Booking.findOne().sort({ bookingId: -1 });
  const nextBookingId = maxBooking ? maxBooking.bookingId + 1 : 1;

  const newBooking = new Booking({
    bookingId: nextBookingId,
    packageId,
    customerName: bookingData.customerName,
    bookingDate: bookingData.bookingDate,
    seats,
  });
  await newBooking.save();

  travelPackage.availableSlots -= seats;
  await travelPackage.save();

  return newBooking;
}



async function getBookingsByPackageId(packageId) {
  return await Booking.find({ packageId });
}

module.exports = {
  createBooking, getBookingsByPackageId
};
