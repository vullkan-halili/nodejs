import makePasswordManager from './passwordManager';
import makeTokenManager from './tokenManager';

const passwordManager = makePasswordManager();
const tokenManager = makeTokenManager();

const securityAdapters = Object.freeze({
  tokenManager,
  passwordManager,
});

export default securityAdapters;
export { tokenManager, passwordManager };
