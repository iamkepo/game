
import { serve, setup } from 'swagger-ui-express';
import { swaggerSpec } from '../helpers/swagger.js';

import index from './pages/index.js';

import auth from './api/auth.js';
import users from './api/users.js';
import teams from './api/teams.js';
import colors from './api/colors.js';
import tables from './api/tables.js';

export default (app) => {
  app.use('/', index);

  app.use('/api/docs', serve, setup(swaggerSpec));

  app.use('/api', auth);

  app.use('/api', users);

  app.use('/api', teams);

  app.use('/api', colors);

  app.use('/api', tables);
};