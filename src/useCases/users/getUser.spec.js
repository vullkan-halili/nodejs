import makeFakeUser from '../../../test/fixtures/user';
import makeGetUser from './getUser';
import { userRepository } from '../../adapters/repositories';
import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';

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
});