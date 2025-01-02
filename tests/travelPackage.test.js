const request = require('supertest');
const { app } = require('../server');
const travelPackageService = require('../services/travelPackageService');

jest.mock('../services/travelPackageService');

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
});
