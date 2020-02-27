import { makeUser } from "../../entities";

export default function makeUpdateUserPassword({ userRepository, passwordManager }) {
  return async function updateUserPassword({
    id,
    oldPassword,
    newPassword,
    confirmedPassword,
  }) {
    if (!id) throw new Error('You must supply an id.');

    const exists = await userRepository.findById({ id });
    if (!exists) throw new Error('User was not found.');

    if (newPassword !== confirmedPassword) {
      throw new Error('Password and confirmation password don\'t match.');
    }

    const isPasswordValid = passwordManager.comparePasswords(oldPassword, exists.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const user = makeUser({ ...exists, password: confirmedPassword });
    const updateObj = {
      password: user.getPassword(),
    }
    return await userRepository.update({ id, updateObj });
  }
}