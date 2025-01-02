const express = require('express');
const router = express.Router();
const travelPackageController = require('../controllers/travelPackageController');

router.get('/packages', travelPackageController.getAllPackages);
router.get('/packages/:destination', travelPackageController.getPackageByDestination);
router.post('/packages/update-seats', travelPackageController.updateAvailableSlots);

module.exports = router;
