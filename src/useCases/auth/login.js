export default function makeLogin({
  userRepository,
  passwordManager,
  tokenManager,
}) {
  return async function login({ username, password }) {
    // throw errors if email or password is not provided.
    if (!username) throw new Error('You must supply an username.');
    if (!password) throw new Error('You must supply a password.');

    const user = await userRepository.findOne({ query: { username } });
    if (!user) throw new Error('Invalid username or password.');

    const isPasswordValid = passwordManager.comparePasswords(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid username or password.');

    const token = await getAccessToken({ user });
    return {
      token,
      message: 'Successful login.',
    };
  };

  async function getAccessToken({ user }) {
    const token = await tokenManager.generateAccessToken({
      _id: user._id,
      username: user.username,
    });

    return token;
  }
}