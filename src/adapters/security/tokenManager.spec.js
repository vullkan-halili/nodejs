import makeTokenManager from './tokenManager';
import extendExpect from '../../utils/extendExpect';
import tryCatchWrapper from '../../utils/tryCatchWrapper';

extendExpect();

describe('token manager', () => {
  const tokenManager = makeTokenManager();
  const payload = {
    _id: '1234',
    role: 'tenant',
  };

  it('must return a token from a payload', async () => {
    tryCatchWrapper(async () => {
      const accessToken = await tokenManager.generateAccessToken(payload);
      expect(accessToken.split('.').length).toBe(3);
    });
  });

  it('must return a decoded user from token', async () => {
    tryCatchWrapper(async () => {
      const accessToken = await tokenManager.generateAccessToken(payload);
      const decoded = await tokenManager.decodeAccessToken(accessToken);
      expect(decoded).toMatchObject(payload);
    });
  });


  it('must return a error when token is not valid.', async () => {
    tryCatchWrapper(async () => {
      const accessToken = await tokenManager.generateAccessToken(payload);
      await expect(tokenManager.decodeAccessToken(`123${accessToken}`))
        .rejects
        .toThrow('invalid token');
    });
  });
});