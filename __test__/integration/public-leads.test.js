const request = require('supertest');
const app = require('../../app');
const { ensureAdminUser } = require('../../utils/seedAdmin');
const { startMemoryDb, clearMemoryDb, stopMemoryDb } = require('../helpers/memory-db');

describe('Public leads and appointments API', () => {
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

  it('creates a public lead and allows admin follow-up', async () => {
    const publicResponse = await request(app).post('/api/public/leads').send({
      firstName: 'Maria',
      lastName: 'Perez',
      email: 'maria@example.com',
      city: 'Bogota',
      idea: 'Dragon shoulder piece'
    });

    expect(publicResponse.statusCode).toBe(201);
    expect(publicResponse.body.data.status).toBe('NEW');

    const login = await request(app).post('/api/auth/login').send({
      emailOrPhone: 'admin@bootcamp.local',
      password: 'Admin12345'
    });
    adminToken = login.body.data.token;

    const listResponse = await request(app)
      .get('/api/leads')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(listResponse.statusCode).toBe(200);
    expect(listResponse.body.data.length).toBe(1);

    const leadId = listResponse.body.data[0]._id;
    const updateResponse = await request(app)
      .patch(`/api/leads/${leadId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'CONTACTED', notes: 'Llamar esta semana' });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.data.status).toBe('CONTACTED');
  });

  it('creates an appointment from admin', async () => {
    const login = await request(app).post('/api/auth/login').send({
      emailOrPhone: 'admin@bootcamp.local',
      password: 'Admin12345'
    });
    adminToken = login.body.data.token;

    const createResponse = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        clientName: 'Juan Toro',
        artistName: 'APZ',
        scheduledFor: '2026-04-20T10:00:00.000Z',
        notes: 'Primera sesion'
      });

    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.body.data.status).toBe('PENDING');

    const listResponse = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(listResponse.statusCode).toBe(200);
    expect(listResponse.body.data.length).toBe(1);
  });
});
