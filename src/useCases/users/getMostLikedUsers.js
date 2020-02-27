export default function makeGetMostLikedUsers({ likeRepository }) {
  return async function getMostLikedUsers({ page, limit }) {
    return likeRepository.findMostLiked({ page, limit });
  }
}