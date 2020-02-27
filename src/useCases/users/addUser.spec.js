import makeFakeUser from '../../../test/fixtures/user';
import makeAddUser from './addUser';
import { userRepository } from '../../adapters/repositories';
import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';

describe('add user', () => {
  const addUser = makeAddUser({ userRepository })
  beforeAll(async () => {
    await tryCatchWrapper(async () => {
      await makeDb();
      await clearCollection('users');
    })
  });

  afterEach(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('users');
    })
  });

  it('should add a user', async () => {
    await tryCatchWrapper(async () => {
      const fakeUser = makeFakeUser();
      const addedUser = await addUser({ info: fakeUser });

      // deleting user password from fake user object
      // because the password return from use case is hashed as supposed.
      delete fakeUser.password;

      expect(addedUser).toMatchObject(fakeUser);
    })
  });


  it('should throw when trying to add a user twice', async () => {
    await tryCatchWrapper(async () => {
      const fakeUser = makeFakeUser();
      await addUser({ info: fakeUser });

      // expect to throw error when trying to add the same user twice
      await expect(addUser({ info: fakeUser }))
        .rejects
        .toThrow('User already exists.');
    })
  })
})