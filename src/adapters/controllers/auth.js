import { login } from '../../useCases/auth';

function makeAuthController({ adaptHttpResponse }) {
  return Object.freeze({
    loginUser,
  });

  async function loginUser(httpRequest) {
    const { username, password } = httpRequest.body;
    const loginResult = await login({ username, password });

    return adaptHttpResponse({
      statusCode: loginResult.token ? 200 : 401,
      result: loginResult,
    });
  }
}

export default makeAuthController;