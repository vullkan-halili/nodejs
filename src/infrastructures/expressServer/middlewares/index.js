import initExternalMiddlewares from './external';
import initErrorHandler from './errorHandler';
import verifyAccessToken from './verifyAccessToken';

const middlewares = Object.freeze({
  initExternalMiddlewares,
  initErrorHandler,
  verifyAccessToken,
});

export default middlewares;
export { initErrorHandler, verifyAccessToken, initExternalMiddlewares };