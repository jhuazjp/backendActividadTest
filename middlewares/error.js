const ApiError = require('../utils/apiError');
const { sendError } = require('../utils/response');

function notFoundHandler(req, _res, next) {
  next(new ApiError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

function errorHandler(error, _req, res, _next) {
  if (error.code === 11000) {
    return sendError(res, 409, 'Ya existe un registro con ese valor');
  }

  if (error.name === 'CastError') {
    return sendError(res, 400, 'Id invalido');
  }

  const statusCode = error.statusCode || 500;
  return sendError(res, statusCode, error.message || 'Error interno del servidor', error.details);
}

module.exports = {
  notFoundHandler,
  errorHandler
};
