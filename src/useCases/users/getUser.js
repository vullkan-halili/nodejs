export default function makeGetUser({ userRepository }) {
  return async function getUser({ id }) {
    if (!id) throw new Error('You must supply an user id.');

    return userRepository.findById({ id });
  }
}