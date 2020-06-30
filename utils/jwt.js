const jwt = require('express-jwt');

const getTokenFromHeaders = (req,res, next) => {
  const { headers: { authorization } } = req;

  if(authorization) return authorization;
  return next(null);
};

const auth = {
  required: jwt({
    secret: 'gh1sec-c0de-jwt77sec9Ac',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'gh1sec-c0de-jwt77sec9Ac',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;