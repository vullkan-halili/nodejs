import makeAddUser from './addUser';
import makeLikeUser from './likeUser';
import makeUnlikeUser from './unlikeUser';
import makeGetMostLikedUsers from './getMostLikedUsers';
import makeGetUserWithLikes from './getUserWithLikes';
import makeUpdateUserPassword from './updateUserPassword';
import { userRepository, likeRepository } from '../../adapters/repositories';
import { passwordManager } from '../../adapters/security';

const addUser = makeAddUser({ userRepository });
const likeUser = makeLikeUser({ userRepository, likeRepository });
const unlikeUser = makeUnlikeUser({ userRepository, likeRepository });
const getMostLikedUsers = makeGetMostLikedUsers({ likeRepository });
const getUserWithLikes = makeGetUserWithLikes({ likeRepository });
const updateUserPassword = makeUpdateUserPassword({ userRepository, passwordManager });

const usersUseCases = Object.freeze({
  addUser,
  likeUser,
  unlikeUser,
  getMostLikedUsers,
  getUserWithLikes,
  updateUserPassword,
});

export default usersUseCases;
export {
  addUser,
  likeUser,
  unlikeUser,
  getMostLikedUsers,
  getUserWithLikes,
  updateUserPassword,
};
