const client = require('../lib/redisConnect');
const { v4: uuidv4 } = require('uuid');
const { payload } = require('../config').jwt;
const authHelper = require('./authHelper');

//generate tokens for Authorization
exports.updateTokens = async() => {
    //create access token
    const accessToken = await authHelper.generateAccessToken(payload);
  
    //create refresh token
    const refreshToken = await authHelper.generateRefreshToken(uuidv4());
  
    //save tokens on Redis db
    await client.set('access', accessToken);
    await client.set('refresh', refreshToken);
  
    return ({
      accessToken,
      refreshToken
    })
  };