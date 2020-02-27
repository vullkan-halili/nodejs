export default async function tryCatchWrapper(fn) {
  try {
    await fn.apply(this);
  } catch (error) {
    console.log('error: ', error);
  }
}