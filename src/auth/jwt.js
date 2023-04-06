const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const makeToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  
  return token;
};

module.exports = {
  makeToken,
};