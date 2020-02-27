import makeDb, { clearCollection } from '../../infrastructures/db';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import makeUserRepository from './user';
import makeFakeUser from '../../../test/fixtures/user';
import extendExpect from '../../utils/extendExpect';

extendExpect();

describe('user repository', () => {
  const userRepository = makeUserRepository({ makeDb });

  beforeAll(async () => {
    await tryCatchWrapper(async () => {
      await makeDb();
    });
  });

  afterEach(async () => {
    await tryCatchWrapper(async () => {
      await clearCollection('users');
    });
  });

  it('should insert an user into DB', async () => {
    await tryCatchWrapper(async () => {
      const fakeUser = makeFakeUser();
      const insertedUser = await userRepository.insert({ info: fakeUser })

      expect(insertedUser).toMatchObject(fakeUser);
    });
  });


  it('should find one user from DB', async () => {
    await tryCatchWrapper(async () => {
      const fakeUser = makeFakeUser({ username: 'test' });
      const insertedUser = await userRepository.insert({ info: fakeUser })
      const foundUser = await userRepository.findOne({
        query: { username: 'test' },
      })
      expect(insertedUser).toMatchObject(foundUser);
    });
  });


  it('should find an user by id from DB', async () => {
    await tryCatchWrapper(async () => {
      const insertedUser = await userRepository.insert({ info: makeFakeUser() })
      const foundById = await userRepository.findById({ id: insertedUser._id })
      expect(insertedUser).toMatchObject(foundById);
    });
  });

  it('should update a user in DB', async () => {
    await tryCatchWrapper(async () => {
      const fakeUser = makeFakeUser({ password: 'zFheDgAAQBAJ' });
      const insertedUser = await userRepository.insert({ info: fakeUser })

      const updateObj = { password: "new password" };
      const updatedUser = await userRepository.update({
        updateObj,
        id: insertedUser._id,
      })
      expect(updatedUser).toMatchObject(updateObj);
    })
  });
})