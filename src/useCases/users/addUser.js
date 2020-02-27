import { makeUser } from '../../entities';

export default function makeAddUser({ userRepository }) {
  return async function addUser({ info }) {
    const user = makeUser(info);

    const exists = await userRepository.findOne({
      query: {
        username: user.getUsername(),
      },
    });
    if (exists) throw new Error('User already exists.');


    const userInfo = {
      username: user.getUsername(),
      password: user.getPassword(),
      createdOn: user.getCreatedOn(),
      modifiedOn: user.getModifiedOn(),
    }

    return userRepository.insert({ info: userInfo });
  }
}