import makeBaseRepository from "./base";

export default function makeUserRepository({ makeDb }) {
  const baseRepository = makeBaseRepository({ makeDb, collection: 'users' });

  return Object.freeze({
    insert: baseRepository.insert,
    update: baseRepository.update,
    findOne: baseRepository.findOne,
    findById: baseRepository.findById,
  });
};
