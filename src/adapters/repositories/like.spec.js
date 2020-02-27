import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import makeLikeRepository from './like';
import makeFakeLike from '../../../test/fixtures/like';
import extendExpect from '../../utils/extendExpect';
import makeUserRepository from './user';
import { ObjectId } from 'mongodb';
import makeFakeUser from '../../../test/fixtures/user';
import constants from '../../utils/constants';

extendExpect();

describe('like repository', () => {
  const userRepository = makeUserRepository({ makeDb });
  const likeRepository = makeLikeRepository({ makeDb, userRepository });

  beforeAll(async () => {
    await tryCatchWrapper(async () => {
      await makeDb();
      await clearCollection('likes');
      await clearCollection('users');
      await makeDb();
    });
  });

  afterEach(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('likes');
      await clearCollection('users');
    });
  });

  it('should insert a like into DB', async () => {
    await tryCatchWrapper(async () => {
      const fakeLike = makeFakeLike();
      const insertedLike = await likeRepository.insert({ info: fakeLike })

      expect(insertedLike).toMatchObject(fakeLike);
    });
  });

  it('should find one like from DB', async () => {
    await tryCatchWrapper(async () => {
      const userLikerId = ObjectId().toHexString();
      const userLikedId = ObjectId().toHexString();

      const fakeLike = makeFakeLike({ userLikerId, userLikedId });
      const insertedLike = await userRepository.insert({ info: fakeLike })
      const foundLike = await userRepository.findOne({
        query: { userLikerId, userLikedId },
      })
      expect(insertedLike).toMatchObject(foundLike);
    });
  });

  it('should find most liked users from DB.', async () => {
    await tryCatchWrapper(async () => {
      const firstUserId = ObjectId().toHexString();
      const secondUserId = ObjectId().toHexString();
      const thirdUserId = ObjectId().toHexString();

      const fakeUsers = [
        makeFakeUser({ _id: firstUserId, username: 'Tom' }),
        makeFakeUser({ _id: secondUserId, username: 'David' }),
        makeFakeUser({ _id: thirdUserId, username: 'Sean' }),
      ]
      await Promise.all(fakeUsers.map(
        (info) => userRepository.insert({ info })
      ));

      const fakeLikes = [
        makeFakeLike({ userLikerId: firstUserId, userLikedId: secondUserId }),
        makeFakeLike({ userLikerId: secondUserId, userLikedId: firstUserId }),
        makeFakeLike({ userLikerId: thirdUserId, userLikedId: firstUserId }),
        makeFakeLike({ userLikerId: firstUserId, userLikedId: thirdUserId }),
      ];
      await Promise.all(fakeLikes.map(
        (info) => likeRepository.insert({ info })
      ));
      const mostLiked = await likeRepository.findMostLiked({ page: 1, limit: constants.ITEMS_PER_PAGE });
      expect(mostLiked.length).toBe(3);
      expect(mostLiked[0].count).toBe(2); // expect Tom to have 2 likes.
      expect(mostLiked[1].count).toBe(1); // expect David to have 1 like.
      expect(mostLiked[2].count).toBe(1); // expect Sean to have 1 like.
    });
  });
})