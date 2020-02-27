const express = require('express');
const makeDb = require('../db');
const config = require('../../../config');
const { initExternalMiddlewares, initErrorHandler } = require('./middlewares');
const initRoutes = require('./routes');

const app = express();

initExternalMiddlewares({ app });
initRoutes({ app });
initErrorHandler({ app })

makeDb()
const server = app.listen(config.app.port || 5000);

if (process.env.NODE_ENV !== 'test') {
  console.log('Database connected!');
  console.log(`Server started on port: ${config.app.port || 5000}`)
}

module.exports = server;