const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'lite_secret_change_me';

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.roles[0]
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  signToken,
  verifyToken
};
