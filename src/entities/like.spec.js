import makeFakeLike from '../../test/fixtures/like';
import buildMakeLike from './like';

describe('like entity', () => {
  const makeLike = buildMakeLike();

  it('should throw error when user who to be liked is not provided.', () => {
    expect(() => makeLike(makeFakeLike({ userLikedId: null })))
      .toThrow('User to be liked must be provided.')
  });

  it('should throw error when user who has liked is not provided.', () => {
    expect(() => makeLike(makeFakeLike({ userLikerId: null })))
      .toThrow('User who has liked must be provided.')
  });
});
