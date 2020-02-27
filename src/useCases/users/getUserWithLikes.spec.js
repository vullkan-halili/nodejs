import makeFakeUser from '../../../test/fixtures/user';
import makeGetUserWithLikes from './getUserWithLikes';
import { likeRepository, userRepository } from '../../adapters/repositories';
import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import { ObjectId } from 'mongodb';
import makeFakeLike from '../../../test/fixtures/like';

describe('get user with likes.', () => {
  const getUserWithLikes = makeGetUserWithLikes({ likeRepository })
  beforeAll(async () => {
    await tryCatchWrapper(async () => {
      await makeDb();
      await clearCollection('users');
    })
  });

  afterAll(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('likes');
    })
  });

  it('should throw an error when no user id is provided.', async () => {
    await tryCatchWrapper(async () => {
      await expect(getUserWithLikes())
        .rejects
        .toThrow('You must supply an user id.');
    })
  })

  it('should return user with likes count.', async () => {
    await tryCatchWrapper(async () => {
      const fakeUserId = ObjectId();
      const username = 'Tommy';
      const fakeUser = makeFakeUser({ _id: fakeUserId, username });
      await userRepository.insert({ info: fakeUser });

      const fakeLikes = [
        makeFakeLike({ userLikedId: fakeUserId }),
        makeFakeLike({ userLikedId: fakeUserId }),
        makeFakeLike({ userLikedId: fakeUserId }),
        makeFakeLike({ userLikedId: fakeUserId }),
      ]

      // insert fake likes to database.
      await Promise.all(fakeLikes.map((info) => likeRepository.insert({ info })));

      const userWithLikes = await getUserWithLikes({ userId: fakeUserId });
      await expect(userWithLikes).toMatchObject({
        username,
        likesCount: 4,
      });
    })
  })
})