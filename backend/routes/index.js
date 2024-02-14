
const swaggerUi = require ('swagger-ui-express');
const { swaggerSpec } = require ('../helpers/swagger');

var index = require('./pages/index');

var auth = require('./api/auth');
var users = require('./api/users');
var teams = require('./api/teams');
var colors = require('./api/colors');
var tables = require('./api/tables');

module.exports = (app) => {
  app.use('/', index);

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api', auth);

  app.use('/api', users);

  app.use('/api', teams);

  app.use('/api', colors);

  app.use('/api', tables);
};