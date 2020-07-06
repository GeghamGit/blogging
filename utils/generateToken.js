const crypto = require('crypto');
const conf = require('../config')

module.exports = (userId) => {
  const text = userId.toString('base64');
  const key = conf.secretTokenKey.key;

  return crypto.createHmac('sha512', key)
    .update(text)
    .digest('hex')
}