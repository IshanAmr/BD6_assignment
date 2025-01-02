const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/:packageId', bookingController.getBookingsByPackageId);


module.exports = router;
