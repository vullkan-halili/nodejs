import makeFakeUser from '../../../test/fixtures/user';
import makeLikeUser from './likeUser';
import { likeRepository, userRepository } from '../../adapters/repositories';
import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import { ObjectId } from 'mongodb';

describe('like user.', () => {
  const likeUser = makeLikeUser({ userRepository, likeRepository })
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

  afterAll(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('users');
      await clearCollection('likes');
    })
  });

  it('should throw an error when user id to be liked is not provided.', async () => {
    await tryCatchWrapper(async () => {
      await expect(likeUser({ userLikerId: ObjectId() }))
        .rejects
        .toThrow('You must provide a user id to like.');
    })
  });

  it('should throw an error when user id who liked is not provided.', async () => {
    await tryCatchWrapper(async () => {
      await expect(likeUser({ userLikedId: ObjectId() }))
        .rejects
        .toThrow('You must provide a user id of liker.');
    })
  });

  it('should throw an error when user to be liked does not exists.', async () => {
    await tryCatchWrapper(async () => {
      const userLikedId = ObjectId();
      const userLikerId = ObjectId();
      const userLiker = makeFakeUser({ _id: userLikerId });
      await userRepository.insert({ info: userLiker });

      await expect(likeUser({ userLikedId, userLikerId }))
        .rejects
        .toThrow('Liked user does not exists.');
    })
  });

  it('should throw an error when user who liked does not exists.', async () => {
    await tryCatchWrapper(async () => {
      const userLikedId = ObjectId();
      const userLikerId = ObjectId();
      const userLiked = makeFakeUser({ _id: userLikedId });
      await userRepository.insert({ info: userLiked });

      await expect(likeUser({ userLikedId, userLikerId }))
        .rejects
        .toThrow('Liker user does not exists.');
    })
  });

  it('should throw an error when the user tries to like twice.', async () => {
    await tryCatchWrapper(async () => {
      const userLikedId = ObjectId();
      const userLikerId = ObjectId();

      const users = [
        makeFakeUser({ _id: userLikedId }),
        makeFakeUser({ _id: userLikerId }),
      ]
      const insertedUsers = await Promise.all(
        users.map((info) => userRepository.insert({ info })),
      );

      // like once.
      await likeUser({ userLikedId, userLikerId });

      // try to like the same user again.
      await expect(likeUser({ userLikedId, userLikerId }))
        .rejects
        .toThrow('You have already liked this user.');
    })
  });

  it('should like a user.', async () => {
    await tryCatchWrapper(async () => {
      const userLikedId = ObjectId();
      const userLikerId = ObjectId();

      const users = [
        makeFakeUser({ _id: userLikedId }),
        makeFakeUser({ _id: userLikerId }),
      ]
      await Promise.all(
        users.map((info) => userRepository.insert({ info })),
      );

      const like = await likeUser({ userLikedId, userLikerId });

      expect(like).toMatchObject({ userLikerId, userLikedId })
    })
  });
})