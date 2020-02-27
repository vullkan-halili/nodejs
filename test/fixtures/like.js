import { ObjectId } from 'mongodb';

export default function makeFakeLike(overrides) {
  const like = {
    userLikerId: ObjectId(),
    userLikedId: ObjectId(),
  }

  return {
    ...like,
    ...overrides,
  }
}