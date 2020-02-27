import makeLogin from './login';
import { userRepository } from '../../adapters/repositories';
import { passwordManager, tokenManager } from '../../adapters/security';

const login = makeLogin({
  userRepository,
  passwordManager,
  tokenManager,
});

const authUseCases = Object.freeze({
  login,
});

export default authUseCases;
export { login };
