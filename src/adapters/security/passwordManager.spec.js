import makePasswordManager from './passwordManager';
import extendExpect from '../../utils/extendExpect';

extendExpect();

describe('password manager', () => {
  const passwordManager = makePasswordManager();
  const password = 'testpassword1';
  const hashedPassword = passwordManager.makePasswordHash(password);

  it('hashed password length must be more than 10 characters', () => {
    expect(hashedPassword.length).toBeGreaterThan(10);
  });

  it('must confirm that password is matching', () => {
    const isValid = passwordManager.comparePasswords(password, hashedPassword);
    expect(isValid).toBe(true);
  });


  it('must confirm that password is not matching', () => {
    const wrongPassword = 'testtest';
    const isValid = passwordManager.comparePasswords(wrongPassword, hashedPassword);
    expect(isValid).toBe(false);
  });
});