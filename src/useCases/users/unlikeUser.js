export default function makeUnlikeUser({ userRepository, likeRepository }) {
  return async function unlikeUser({ userUnlikedId, userLikerId }) {
    if (!userUnlikedId) throw new Error('You must provide a user id to unlike.');
    if (!userLikerId) throw new Error('You must provide a user id of liker.');

    const [userLiker, userUnliked] = await Promise.all([
      userRepository.findById({ id: userLikerId }),
      userRepository.findById({ id: userUnlikedId }),
    ])
    if (!userLiker) throw new Error('Liker user does not exists.')
    if (!userUnliked) throw new Error('User to unlike does not exists.')

    const removed = await likeRepository.removeLike({
      userUnlikedId: userUnliked._id,
      userLikerId: userLiker._id,
    });

    return { deletedCount: removed.deletedCount }
  }
}