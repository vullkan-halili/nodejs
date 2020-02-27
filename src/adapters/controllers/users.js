import makeBaseController from './base';
import {
  getUser,
  addUser,
  likeUser,
  unlikeUser,
  getUserWithLikes,
  getMostLikedUsers,
  updateUserPassword,
} from '../../useCases/users';
import constants from '../../utils/constants';

export default function makeUsersController({ adaptHttpResponse }) {
  const baseController = makeBaseController({ adaptHttpResponse });

  return Object.freeze({
    likeAUser,
    unlikeAUser,
    retrieveUserWithLikes,
    retrieveMostLikedUsers,
    getMe: (httpRequest) => baseController.getItemById({
      addItemUseCase: getUser,
      id: httpRequest.userId,
    }),
    insertUser: (httpRequest) => baseController.insertItem({
      addItemUseCase: addUser,
      info: httpRequest.body,
    }),
    updatePassword: (httpRequest) => baseController.updateItem({
      updateItemUseCase: updateUserPassword,
      id: httpRequest.userId,
      changes: httpRequest.body,
    }),
  });

  async function likeAUser(httpRequest) {
    const { userId } = httpRequest;
    const { id } = httpRequest.params;

    const result = await likeUser({ userLikedId: id, userLikerId: userId });
    return adaptHttpResponse({
      result,
      statusCode: 200,
    });
  }

  async function unlikeAUser(httpRequest) {
    const { userId } = httpRequest;
    const { id } = httpRequest.params;
    const result = await unlikeUser({ userUnlikedId: id, userLikerId: userId });
    return adaptHttpResponse({
      result,
      statusCode: 200,
    });
  };

  async function retrieveUserWithLikes(httpRequest) {
    const { id } = httpRequest.params;
    const result = await getUserWithLikes({ userId: id });

    return adaptHttpResponse({
      result,
      statusCode: 200,
    })
  }

  async function retrieveMostLikedUsers(httpRequest) {
    let { page, limit } = httpRequest.query;
    page = page || 1;
    limit = limit || constants.ITEMS_PER_PAGE;
    const result = await getMostLikedUsers({ page, limit });

    return adaptHttpResponse({
      result,
      statusCode: 200,
    });
  }
}