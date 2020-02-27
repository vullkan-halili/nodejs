import request from 'supertest';
import { clearCollection } from '../../db';
import tryCatchWrapper from '../../../utils/tryCatchWrapper';
import makeFakeUser from '../../../../test/fixtures/user';
import { ObjectId } from 'mongodb';
import { userRepository, likeRepository } from '../../../adapters/repositories';
import makeFakeLike from '../../../../test/fixtures/like';

/**
 * NOTE: After we already made Unit & Integration tests 
 * we won't consider all the cases in this section.
 */
describe("End to end (ENDPOINT) test", () => {
  let server = null;
  beforeAll(() => {
    server = require('../');
  });

  afterEach(async () => {
    await clearCollection('users');
    await clearCollection('likes');
  });

  afterAll(async () => await server.close());

  describe("signup", () => {
    it('should register return status code 201 for user registration', async () => {
      const user = {
        username: 'test.user',
        password: 'test.password',
      }
      const response = await request(server)
        .post('/signup')
        .send(user)

      expect(response.body.username).toEqual(user.username);
      expect(response.status).toBe(201);
    })
  })

  describe("like user", () => {
    it('should register return status code 403 for not providing user access token', async () => {
      const fakeUserId = ObjectId().toHexString();
      const response = await request(server)
        .post(`/user/${fakeUserId}/like`)
        .send({})

      expect(response.body.errorMessage).toEqual('No token provided.');
      expect(response.status).toBe(403);
    })
  })

  describe("most liked", () => {
    it('should return http status code 200 with response data of top most liked users', async () => {
      /**
       * NOTE: This is just a copy of the tests made
       * in the repository section of integration tests.
       */
      await tryCatchWrapper(async () => {
        const firstUserId = ObjectId().toHexString();
        const secondUserId = ObjectId().toHexString();
        const thirdUserId = ObjectId().toHexString();

        const fakeUsers = [
          makeFakeUser({ _id: firstUserId, username: 'Tom' }),
          makeFakeUser({ _id: secondUserId, username: 'Ema' }),
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
        const response = await request(server).get('/most-liked');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
        expect(response.body.find(user => user.username === 'Tom').count).toBe(2); // expect Tom to have 2 likes.
        expect(response.body.find(user => user.username === 'Ema').count).toBe(1); // expect Ema to have 1 like.
        expect(response.body.find(user => user.username === 'Sean').count).toBe(1); // expect Sean to have 1 like.
      })
    })
  })
})