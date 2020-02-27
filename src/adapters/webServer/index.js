export default function makeExpressCallback(controller) {
  return async (req, res, next) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      method: req.method,
      userId: req.userId,
    }

    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      res.type('json');
      return res.status(httpResponse.headers.statusCode).send(httpResponse.body);
    } catch (ex) {
      return next(ex)
    }
  }
}