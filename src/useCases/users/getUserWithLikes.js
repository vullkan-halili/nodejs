export default function makeGetUserWithLikes({ likeRepository }) {
  return async function getUserWithLikes({ userId } = {}) {
    if (!userId) throw new Error('You must supply an user id.');

    return likeRepository.findUserWithLikes({ userId });
  }
}