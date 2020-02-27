import routes from './routes';

const initRoutes = ({ app }) => {
  app.use('/', routes);
}

module.exports = initRoutes;