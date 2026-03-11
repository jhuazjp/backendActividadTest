const User = require('../models/User');
const ApiError = require('../utils/apiError');
const { hashPassword } = require('../utils/password');
const { sendSuccess } = require('../utils/response');

const ALLOWED_ROLES = ['ADMIN', 'ARTIST', 'CLIENT'];

function normalizeRole(body) {
  return body.role || (Array.isArray(body.roles) ? body.roles[0] : null);
}

async function listUsers(_req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  return sendSuccess(
    res,
    users.map((user) => user.toSafeObject())
  );
}

async function createUser(req, res) {
  const { firstName, lastName, email, phone, password } = req.body;
  const role = normalizeRole(req.body);

  if (!firstName || !lastName || !email || !password || !role) {
    throw new ApiError(400, 'firstName, lastName, email, password y role son requeridos');
  }

  if (!ALLOWED_ROLES.includes(role)) {
    throw new ApiError(400, 'Rol no permitido');
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, 'Ya existe un usuario con ese email');
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    passwordHash,
    role
  });

  return sendSuccess(res, user.toSafeObject(), 201);
}

module.exports = {
  listUsers,
  createUser
};
