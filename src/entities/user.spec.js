import makeFakeUser from '../../test/fixtures/user';
import buildMakeUser from './user';

describe('user entity', () => {
  const makeUser = buildMakeUser({
    hashPassword: (text) => text // mocking hash function for testing purposes.
  });

  it('should throw error when username is not provided.', () => {
    expect(() => makeUser(makeFakeUser({ username: null })))
      .toThrow('User must have an username.')
  });

  it('should throw error when password is not provided.', () => {
    expect(() => makeUser(makeFakeUser({ password: null })))
      .toThrow('User must have a password.')
  });

  it('username must be between 2 and 30 characters.', () => {
    expect(() => makeUser(makeFakeUser({ username: 'A' })))
      .toThrow('Username must be between 2 and 30 characters.')
  });

  it('password must be between 6 and 30 characters.', () => {
    expect(() => makeUser(makeFakeUser({ password: '1234' })))
      .toThrow('Password must be between 6 and 30 characters.')
  });
});
