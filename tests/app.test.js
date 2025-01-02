const request = require('supertest');
const { app } = require('../server');
const travelPackageService = require('../services/travelPackageService');
const bookingService = require('../services/bookingService');

jest.mock('../services/travelPackageService');
jest.mock('../services/bookingService');

describe('GET /packages', () => {
  it('should retrieve all travel packages successfully', async () => {
    travelPackageService.getAllPackages.mockResolvedValue([
      { packageId: 1, destination: "Paris", price: 1500, duration: 7, availableSlots: 10 },
      { packageId: 2, destination: "Rome", price: 1200, duration: 5, availableSlots: 15 }
    ]);

    const response = await request(app).get('/packages');

    expect(response.status).toBe(200);
    expect(response.body.packages).toHaveLength(2);
    expect(response.body.packages[0].destination).toBe('Paris');
    expect(response.body.packages[1].destination).toBe('Rome');
  });

  describe('GET /packages/:destination', () => {
    it('should retrieve a travel package by destination', async () => {
      const destination = 'Paris';
      const mockPackage = {
        packageId: 1,
        destination: 'Paris',
        price: 1500,
        duration: 7,
        availableSlots: 10
      };

      travelPackageService.getPackageByDestination.mockResolvedValue(mockPackage);

      const response = await request(app).get(`/packages/${destination}`);

      expect(response.status).toBe(200);
    });

    it('should return 404 when package is not found', async () => {
      const destination = 'Nonexistent Destination';
      travelPackageService.getPackageByDestination.mockResolvedValue(null);

      const response = await request(app).get(`/packages/${destination}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Package not found');
    });
  });

  describe('POST /bookings', () => {

    it('should return 400 if booking data is invalid', async () => {
      const bookingData = {
        packageId: 1,
        name: '',
        email: 'invalid-email',
        seats: 0
      };

      const response = await request(app).post('/bookings').send(bookingData);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /packages/seats-update', () => {

    it('should return 404 when package to update is not found', async () => {
      const updateData = {
        packageId: 999,
        seatsBooked: 2
      };

      travelPackageService.updateAvailableSlots.mockResolvedValue(null);

      const response = await request(app).post('/packages/seats-update').send(updateData);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /bookings/:packageId', () => {
    it('should retrieve all bookings for a package', async () => {
      const packageId = 1;
      const mockBookings = [
        { bookingId: 123, packageId: 1, name: 'John Doe', seats: 2 },
        { bookingId: 124, packageId: 1, name: 'Jane Doe', seats: 3 }
      ];

      bookingService.getBookingsByPackageId.mockResolvedValue(mockBookings);

      const response = await request(app).get(`/bookings/${packageId}`);

      expect(response.status).toBe(200);
    });

    it('should return 404 when no bookings found for a package', async () => {
      const packageId = 999;

      bookingService.getBookingsByPackageId.mockResolvedValue([]);

      const response = await request(app).get(`/bookings/${packageId}`);

      expect(response.status).toBe(404);
    });
  });
});
