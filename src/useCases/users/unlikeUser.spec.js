import makeFakeUser from '../../../test/fixtures/user';
import makeUnlikeUser from './unlikeUser';
import { likeRepository, userRepository } from '../../adapters/repositories';
import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import { ObjectId } from 'mongodb';

describe('unlike user.', () => {
  const unlikeUser = makeUnlikeUser({ userRepository, likeRepository })
  beforeAll(async () => {
    await tryCatchWrapper(async () => {
      await makeDb();
      await clearCollection('users');
      await clearCollection('likes');
    })
  });

  afterEach(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('users');
      await clearCollection('likes');
    })
  });

  it('should throw an error when user id to be unliked is not provided.', async () => {
    await tryCatchWrapper(async () => {
      await expect(unlikeUser({ userLikerId: ObjectId() }))
        .rejects
        .toThrow('You must provide a user id to unlike.');
    })
  });

  it('should throw an error when user id who unliked is not provided.', async () => {
    await tryCatchWrapper(async () => {
      await expect(unlikeUser({ userUnlikedId: ObjectId() }))
        .rejects
        .toThrow('You must provide a user id of liker.');
    })
  });

  it('should throw an error when user to be unliked does not exists.', async () => {
    await tryCatchWrapper(async () => {
      const userLikerId = ObjectId();
      const userLiker = makeFakeUser({ _id: userLikerId });
      await userRepository.insert({ info: userLiker });

      await expect(unlikeUser({ userUnlikedId: ObjectId(), userLikerId }))
        .rejects
        .toThrow('User to unlike does not exists.');
    })
  });

  it('should throw an error when user who is unliking does not exists.', async () => {
    await tryCatchWrapper(async () => {
      const userUnlikedId = ObjectId();
      const userLikerId = ObjectId();
      const userUnliked = makeFakeUser({ _id: userUnlikedId });
      await userRepository.insert({ info: userUnliked });

      await expect(unlikeUser({ userUnlikedId, userLikerId }))
        .rejects
        .toThrow('Liker user does not exists.');
    })
  });

  it('should unlike a user.', async () => {
    await tryCatchWrapper(async () => {
      const userUnlikedId = ObjectId();
      const userLikerId = ObjectId();

      const users = [
        makeFakeUser({ _id: userUnlikedId }),
        makeFakeUser({ _id: userLikerId }),
      ]
      await Promise.all(
        users.map((info) => userRepository.insert({ info })),
      );

      await likeRepository.insert({
        info: {
          userLikerId, userLikedId: userUnlikedId
        }
      })

      const unlike = await unlikeUser({ userUnlikedId, userLikerId });
      expect(unlike.deletedCount).toBe(1);
    })
  });
})