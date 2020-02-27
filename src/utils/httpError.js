export default function makeHttpError({ statusCode, errorMessage }) {
  return Object.freeze({
    statusCode,
    error: errorMessage,
  })
}