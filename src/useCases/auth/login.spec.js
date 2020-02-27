import makeFakeUser from '../../../test/fixtures/user';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import makeLogin from './login';
import makeAddUser from '../users/addUser';
import { userRepository } from '../../adapters/repositories';
import { tokenManager, passwordManager } from '../../adapters/security';
import makeDb, { clearCollection } from '../../infrastructures/db';

describe('login user', () => {
  let login = makeLogin({ userRepository, passwordManager, tokenManager });
  let addUser = makeAddUser({ userRepository });
  let storedUser = null;

  beforeAll(async () => {
    await tryCatchWrapper(async () => {
      await makeDb();
      const userInfo = {
        username: 'test@example.com',
        password: 'testpassword',
      };

      const newUser = makeFakeUser(userInfo);
      storedUser = await addUser({ info: newUser });
    });
  });

  afterAll(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('users');
    });
  });

  it('throws error when not supplying credentials', async () => {
    await tryCatchWrapper(async () => {
      await expect(login({}))
        .rejects
        .toThrow('You must supply an username.');
    });
  });

  it('throws error when not supplying username', async () => {
    await tryCatchWrapper(async () => {
      await expect(login({ password: 'testpassword' }))
        .rejects
        .toThrow('You must supply an username.');
    });
  });


  it('throws error when not supplying password', async () => {
    await tryCatchWrapper(async () => {
      await expect(login({ username: 'test@example.com' }))
        .rejects
        .toThrow('You must supply a password.');
    });
  });

  it('login the user and returns the access token', async () => {
    await tryCatchWrapper(async () => {
      const loginResult = await login({
        username: 'test@example.com',
        password: 'testpassword',
      });

      const expectedToken = tokenManager.generateAccessToken({
        _id: storedUser._id,
        username: storedUser.username,
      });

      const expectedResponse = {
        token: expectedToken,
        message: 'Successful login.',
      };

      expect(loginResult).toMatchObject(expectedResponse);
    });
  });

  it('doesn\'t login the user with wrong password', async () => {
    await tryCatchWrapper(async () => {
      const loginPromise = login({
        username: 'test@example.com',
        password: 'wrongpassword',
      });

      await expect(loginPromise)
      .rejects
      .toThrow('Invalid username or password.');
    });
  });

  it('doesn\'t login the non existent user', async () => {
    await tryCatchWrapper(async () => {
      const loginPromise = login({
        username: 'fake@example.com',
        password: 'fakepassword',
      });

      await expect(loginPromise)
        .rejects
        .toThrow('Invalid username or password.');
    });
  });
});