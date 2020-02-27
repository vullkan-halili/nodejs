import mongodb from 'mongodb';
import config from '../../../config';

const MongoClient = mongodb.MongoClient
const dbType = process.env.NODE_ENV === 'test' ? 'test' : 'main'
const { url, name } = config.db[dbType];
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async function makeDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(name);
}

module.exports.clearCollection = async function clearCollection(collection) {
  await client.db(name).collection(collection).deleteMany({})
  return true
}