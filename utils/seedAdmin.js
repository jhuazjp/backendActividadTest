const User = require('../models/User');
const { hashPassword } = require('./password');

async function ensureAdminUser() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@bootcamp.local').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin12345';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    return existingAdmin;
  }

  const passwordHash = await hashPassword(adminPassword);

  return User.create({
    firstName: 'Bootcamp',
    lastName: 'Admin',
    email: adminEmail,
    passwordHash,
    role: 'ADMIN',
    isActive: true
  });
}

module.exports = {
  ensureAdminUser
};
