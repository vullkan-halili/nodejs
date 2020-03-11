import makeAddUser from './addUser';
import makeLikeUser from './likeUser';
import makeUnlikeUser from './unlikeUser';
import makeGetMostLikedUsers from './getMostLikedUsers';
import makeGetUserWithLikes from './getUserWithLikes';
import makeUpdateUserPassword from './updateUserPassword';
import makeGetUser from './getUser';
import { userRepository, likeRepository } from '../../adapters/repositories';
import { passwordManager } from '../../adapters/security';

const addUser = makeAddUser({ userRepository });
const likeUser = makeLikeUser({ userRepository, likeRepository });
const unlikeUser = makeUnlikeUser({ userRepository, likeRepository });
const getMostLikedUsers = makeGetMostLikedUsers({ likeRepository });
const getUserWithLikes = makeGetUserWithLikes({ likeRepository });
const updateUserPassword = makeUpdateUserPassword({ userRepository, passwordManager });
const getUser = makeGetUser({ userRepository })

const usersUseCases = Object.freeze({
  addUser,
  likeUser,
  unlikeUser,
  getMostLikedUsers,
  getUserWithLikes,
  updateUserPassword,
  getUser,
});

export default usersUseCases;
export {
  addUser,
  likeUser,
  unlikeUser,
  getMostLikedUsers,
  getUserWithLikes,
  updateUserPassword,
  getUser,
};
