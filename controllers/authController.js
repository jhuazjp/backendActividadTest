const User = require('../models/User');
const ApiError = require('../utils/apiError');
const { comparePassword } = require('../utils/password');
const { signToken } = require('../utils/jwt');
const { sendSuccess } = require('../utils/response');

function buildIdentifierQuery(emailOrPhone) {
  return emailOrPhone.includes('@')
    ? { email: emailOrPhone.toLowerCase() }
    : { phone: emailOrPhone };
}

async function login(req, res) {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    throw new ApiError(400, 'emailOrPhone y password son requeridos');
  }

  const user = await User.findOne(buildIdentifierQuery(emailOrPhone)).select('+passwordHash');

  if (!user || !user.isActive) {
    throw new ApiError(401, 'Credenciales invalidas');
  }

  const passwordMatches = await comparePassword(password, user.passwordHash);
  if (!passwordMatches) {
    throw new ApiError(401, 'Credenciales invalidas');
  }

  const safeUser = user.toSafeObject();

  return sendSuccess(res, {
    user: safeUser,
    token: signToken(safeUser)
  });
}

module.exports = {
  login
};
