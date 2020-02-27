export default function adaptHttpResponse({
  statusCode = 200,
  result = '',
}) {
  return Object.freeze({
    headers: {
      'Content-Type': 'application/json',
      statusCode,
    },
    body: JSON.stringify(result),
  });
}