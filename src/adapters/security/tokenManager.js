import jwt from 'jsonwebtoken';
import config from '../../../config';

export default function makeTokenManager() {
  return Object.freeze({
    generateAccessToken,
    decodeAccessToken,
  });

  async function generateAccessToken(payload) {
    const accessToken = jwt.sign(
      payload,
      config.jwt.secret,
      { expiresIn: '24h' },
    );

    return accessToken;
  }

  async function decodeAccessToken(accessToken) {
    const decodedToken = jwt.verify(
      accessToken,
      config.jwt.secret,
      { complete: true },
    );

    return decodedToken.payload;
  }
}