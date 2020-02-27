import { ObjectId } from 'mongodb';

export default function makeBaseRepository({ makeDb, collection }) {
  return Object.freeze({
    insert,
    update,
    findOne,
    findById,
  });

  async function insert({ info }) {
    const db = await makeDb();
    const result = await db.collection(collection).insertOne(info);
    return result.ops[0]
  }

  async function update({ id, updateObj }) {
    const db = await makeDb();
    const result = await db.collection(collection).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { ...updateObj } },
      { returnOriginal: false },
    );
    return result ? result.value : null
  }

  async function findById({ id }) {
    const db = await makeDb();
    const _id = ObjectId(id)
    const result = await db.collection(collection).findOne({ _id });
    return result;
  }
  async function findOne({ query = {} } = {}) {
    const db = await makeDb();
    const result = await db.collection(collection).findOne(query);
    return result;
  }
}