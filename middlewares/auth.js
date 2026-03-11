const User = require('../models/User');
const ApiError = require('../utils/apiError');
const { verifyToken } = require('../utils/jwt');

async function requireAuth(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Token requerido');
    }

    const token = authHeader.slice(7);
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub);

    if (!user || !user.isActive) {
      throw new ApiError(401, 'Usuario no autorizado');
    }

    req.user = user.toSafeObject();
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token invalido o expirado'));
    }

    return next(error);
  }
}

function requireAdmin(req, _res, next) {
  if (!req.user || !req.user.roles.includes('ADMIN')) {
    return next(new ApiError(403, 'Acceso solo para ADMIN'));
  }

  return next();
}

module.exports = {
  requireAuth,
  requireAdmin
};
