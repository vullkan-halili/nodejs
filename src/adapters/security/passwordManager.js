import bcrypt from 'bcryptjs';

export default function makePasswordManager() {
  return Object.freeze({
    makePasswordHash,
    comparePasswords,
  });

  function makePasswordHash(password) {
    return bcrypt.hashSync(password, 12);
  }

  function comparePasswords(inputPassword, storedPassword) {
    return bcrypt.compareSync(inputPassword, storedPassword);
  }
}