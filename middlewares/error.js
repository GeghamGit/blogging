const createError = require('http-errors');
const errorStructure = require('../lib/errors');

module.exports = (app) => {
  app.use((req, res, next) => {
    next(createError(404))
  });

  app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.json(await errorStructure(err));
  });
};