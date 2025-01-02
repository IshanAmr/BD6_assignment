const express = require('express');
const router = express.Router();
const seederController = require('../controllers/seederController');

router.post('/packages', seederController.seedPackages);

router.post('/bookings', seederController.seedBookings);

module.exports = router;
