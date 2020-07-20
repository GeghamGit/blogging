const { payload, secretKey } = require('../config').jwt;
const jwt = require('jsonwebtoken');

//generate method for access token
exports.generateAccessToken = () => {
  return jwt.sign({payload}, secretKey, {
    algorithm: 'HS256',
    expiresIn: 600
  });
};

//generate method for refresh token
exports.generateRefreshToken = (uuidv4) => {
  return jwt.sign({uuidv4}, secretKey, {
    algorithm: 'HS256',
    expiresIn: 1200
  });
};