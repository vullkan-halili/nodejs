import express from 'express';
import { usersController, authController } from '../../../adapters/controllers';
import makeExpressCallback from '../../../adapters/webServer';
import { verifyAccessToken } from '../middlewares';

const router = express.Router();

const {
  getMe,
  insertUser,
  updatePassword,
  retrieveUserWithLikes,
  likeAUser,
  unlikeAUser,
  retrieveMostLikedUsers
} = usersController;

const { loginUser } = authController;

router.get('/me', verifyAccessToken, makeExpressCallback(getMe));
router.get('/most-liked', makeExpressCallback(retrieveMostLikedUsers));
router.get('/user/:id', makeExpressCallback(retrieveUserWithLikes));

router.post('/login', makeExpressCallback(loginUser));
router.post('/signup', makeExpressCallback(insertUser));
router.post('/user/:id/like', verifyAccessToken, makeExpressCallback(likeAUser));

router.put('/me/update-password', verifyAccessToken, makeExpressCallback(updatePassword));
router.delete('/user/:id/unlike', verifyAccessToken, makeExpressCallback(unlikeAUser));

export default router;