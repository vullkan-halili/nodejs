import makeFakeUser from '../../../test/fixtures/user';
import makeGetUser from './getUser';
import { userRepository } from '../../adapters/repositories';
import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import { ObjectId } from 'mongodb';

describe('get user.', () => {
  const getUser = makeGetUser({ userRepository });

  beforeAll(async () => {
    await tryCatchWrapper(async () => {
      await makeDb();
      await clearCollection('users');
    })
  });

  afterAll(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('users');
    })
  });

  it('should throw when no user id is provided.', async () => {
    await tryCatchWrapper(async () => {
      await expect(getUser({}))
        .rejects
        .toThrow('You must supply an user id.')
    })
  });

  it('should get a user.', async () => {
    await tryCatchWrapper(async () => {
      const userId = ObjectId();
      const fakeUser = makeFakeUser({ _id: userId });

      // insert a user in DB.
      const inserted = await userRepository.insert({ info: fakeUser });
      const fetchedUser = await getUser({ id: userId });
      expect(fetchedUser).toMatchObject(fakeUser)
    })
  });
});