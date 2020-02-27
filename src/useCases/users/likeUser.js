export default function makeLikeUser({ userRepository, likeRepository, toObjectId }) {
  return async function likeUser({ userLikedId, userLikerId }) {
    if (!userLikedId) throw new Error('You must provide a user id to like.');
    if (!userLikerId) throw new Error('You must provide a user id of liker.');

    const [userLiker, userLiked] = await Promise.all([
      userRepository.findById({ id: userLikerId }),
      userRepository.findById({ id: userLikedId }),
    ])
    if (!userLiker) throw new Error('Liker user does not exists.')
    if (!userLiked) throw new Error('Liked user does not exists.')

    const exists = await likeRepository.findOne({
      query: {
        userLikerId: userLiker._id,
        userLikedId: userLiked._id,
      }
    });
    if (exists) throw new Error('You have already liked this user.')

    return likeRepository.insert({
      info: {
        userLikedId: userLiked._id,
        userLikerId: userLiker._id
      }
    });
  }
}