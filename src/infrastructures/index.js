import expressServer from './expressServer';
import makeDb from './db';

const infrastructures = Object.freeze({
  makeDb,
  expressServer,
})

export default infrastructures;
export { makeDb, expressServer };
