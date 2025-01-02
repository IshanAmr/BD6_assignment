const bookingService = require('../services/bookingService');

async function createBooking(req, res) {
  const { packageId, customerName, bookingDate, seats } = req.body;

  if (!packageId || !customerName || !bookingDate || !seats) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const bookingData = { packageId, customerName, bookingDate, seats };
    const newBooking = await bookingService.createBooking(bookingData);
    res.status(201).json({ booking: newBooking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getBookingsByPackageId(req, res) {
  const { packageId } = req.params;

  try {
    const bookings = await bookingService.getBookingsByPackageId(packageId);
    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this package' });
    }
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createBooking, getBookingsByPackageId
};
