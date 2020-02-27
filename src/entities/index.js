import buildMakeUser from './user';
import buildMakeLike from './like';
import { passwordManager } from '../adapters/security';

const makeUser = buildMakeUser({
    hashPassword: passwordManager.makePasswordHash, // hash a password.
})
const makeLike = buildMakeLike();

const entities = Object.freeze({
    makeUser,
    makeLike,
});

export default entities;
export { makeUser, makeLike };
