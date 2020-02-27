export default function buildMakeUser({ hashPassword }) {
  return function makeUser({
    username,
    password,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) {
    if (!username) throw new Error('User must have an username.');
    if (!password) throw new Error('User must have a password.');
    if (username.length <= 2 || username.length >= 30) {
      throw new Error('Username must be between 2 and 30 characters.')
    }
    if (password.length <= 6 || password.length >= 30) {
      throw new Error('Password must be between 6 and 30 characters.')
    }

    return Object.freeze({
      getUsername: () => username,
      getPassword: () => hashPassword(password),
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
    })
  }
}