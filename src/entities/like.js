export default function buildMakeLike() {
  return function makeLike({
    userLikedId,
    userLikerId,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) {
    if (!userLikedId) throw new Error('User to be liked must be provided.');
    if (!userLikerId) throw new Error('User who has liked must be provided.');

    return Object.freeze({
      getUserLikedId: () => userLikedId,
      getUserLikerId: () => userLikerId,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
    })
  }
}