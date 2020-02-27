import { tokenManager } from '../../../adapters/security';

export default async function (req, res, next) {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        statusCode: 403,
        errorMessage: 'No token provided.',
      });
    }

    const decoded = await tokenManager.decodeAccessToken(token);
    // if everything good, save user id to request for use in other routes

    req.userId = decoded._id;
  } catch (ex) {
    return res.status(401).send({
      statusCode: 401,
      errorMessage: 'Invalid access token.',
    });
  }

  return next();
}