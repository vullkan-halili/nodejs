import makeLikeRepository from './like';
import makeDb from '../../infrastructures/db';
import makeUserRepository from './user';

const userRepository = makeUserRepository({ makeDb });
const likeRepository = makeLikeRepository({ makeDb, userRepository });

const repositories = Object.freeze({
  userRepository,
  likeRepository,
});

export default repositories;
export { userRepository, likeRepository };


