// error handler
export default function initErrorHandler({ app }) {
  app.use((err, req, res, next) => {
    let statusCode = 500;

    if (err.name === 'JsonWebTokenError') {
      statusCode = 401;
      errorMessage = 'Invalid token.';
    }

    console.error('something went wrong: ', err.name);

    const error = {
      statusCode,
      errorMessage: err.message,
    };

    return res.status(statusCode).send(error);
  });
}