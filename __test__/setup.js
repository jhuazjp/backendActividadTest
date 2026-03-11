jest.setTimeout(120000);

beforeAll(() => {
  process.env.JWT_SECRET = 'test_lite_secret';
  process.env.ADMIN_EMAIL = 'admin@bootcamp.local';
  process.env.ADMIN_PASSWORD = 'Admin12345';
});
