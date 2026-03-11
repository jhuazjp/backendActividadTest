const request = require('supertest');
const app = require('../../app');
const { ensureAdminUser } = require('../../utils/seedAdmin');
const { startMemoryDb, clearMemoryDb, stopMemoryDb } = require('../helpers/memory-db');

describe('Auth and users API', () => {
  let adminToken;

  beforeAll(async () => {
    await startMemoryDb();
    await ensureAdminUser();
  });

  afterEach(async () => {
    await clearMemoryDb();
    await ensureAdminUser();
  });

  afterAll(async () => {
    await stopMemoryDb();
  });

  it('logs in with the seeded admin user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      emailOrPhone: 'admin@bootcamp.local',
      password: 'Admin12345'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.roles).toEqual(['ADMIN']);
    expect(response.body.data.token).toBeTruthy();

    adminToken = response.body.data.token;
  });

  it('allows an admin to create and list users', async () => {
    const login = await request(app).post('/api/auth/login').send({
      emailOrPhone: 'admin@bootcamp.local',
      password: 'Admin12345'
    });

    adminToken = login.body.data.token;

    const createResponse = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'Ana',
        lastName: 'Lopez',
        email: 'ana@example.com',
        password: 'Secret123',
        role: 'CLIENT'
      });

    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.body.data.roles).toEqual(['CLIENT']);

    const listResponse = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(listResponse.statusCode).toBe(200);
    expect(listResponse.body.data.length).toBe(2);
  });
});
