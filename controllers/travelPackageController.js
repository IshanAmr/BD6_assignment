const travelPackageService = require('../services/travelPackageService');

async function getAllPackages(req, res) {
  try {
    const packages = await travelPackageService.getAllPackages();
    res.status(200).json({ packages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve travel packages' });
  }
}

async function getPackageByDestination(req, res) {
  const { destination } = req.params;
  try {
    const travelPackage = await travelPackageService.getPackageByDestination(destination);
    if (!travelPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json({ travelPackage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve travel package' });
  }
}

async function updateAvailableSlots(req, res) {
  const { packageId, seatsBooked } = req.body;

  try {
    const updatedPackage = await travelPackageService.updateAvailableSlots(packageId, seatsBooked);
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Travel package not found' });
    }
    res.status(200).json({ package: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPackages,
  getPackageByDestination,
  updateAvailableSlots
};
