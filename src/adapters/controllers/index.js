import makeUsersController from './users';
import makeAuthController from './auth';
import adaptHttpResponse from '../../utils/adaptResponse';

const usersController = makeUsersController({ adaptHttpResponse });
const authController = makeAuthController({ adaptHttpResponse });

const controllers = Object.freeze({
  usersController,
  authController,
});

export default controllers;
export { authController, usersController };