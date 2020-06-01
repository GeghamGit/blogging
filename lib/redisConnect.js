const Promis = require("bluebird");

const redis = Promis.promisifyAll(require("bluebird"));

const client = redis.createClient();

module.exports = client;
