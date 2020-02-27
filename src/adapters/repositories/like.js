import { ObjectId } from 'mongodb';
import makeBaseRepository from './base';
import constants from '../../utils/constants';

export default function makeLikeRepository({ makeDb, userRepository }) {
  const collection = 'likes';
  const baseController = makeBaseRepository({ makeDb, collection });

  return Object.freeze({
    removeLike,
    findMostLiked,
    findUserWithLikes,
    insert: baseController.insert,
    findOne: baseController.findOne,
  });

  async function findMostLiked({ page = 1, limit = constants.ITEMS_PER_PAGE }) {
    const db = await makeDb();
    const pageNumber = page === 0 ? 1 : page;
    const skip = Number(pageNumber) * limit - limit;
    const aggregation = [
      {
        $lookup: {
          from: 'users',
          as: 'userLiked',
          localField: 'userLikedId',
          foreignField: '_id'
        }
      },
      { $unwind: "$userLiked" },
      {
        $group: {
          _id: {
            userLikedId: '$userLiked._id',
            userLiked: "$userLiked"
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id: 0,
          username: "$_id.userLiked.username",
          count: "$count"
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      { $skip: skip },
      { $limit: limit },
    ];
    let result = await db.collection(collection).aggregate(aggregation).toArray();

    return result;
  }

  async function findUserWithLikes({ userId }) {
    const db = await makeDb();
    const [likesCount, user] = await Promise.all([
      db.collection(collection).countDocuments({ userLikedId: ObjectId(userId) }),
      userRepository.findById({ id: userId }),
    ])

    return {
      likesCount,
      username: user.username,
    };
  }

  async function removeLike({ userLikerId, userUnlikedId }) {
    const db = await makeDb();
    const deleted = await db.collection(collection).deleteOne({
      userLikedId: userUnlikedId,
      userLikerId: userLikerId,
    });
    return deleted;
  }
}