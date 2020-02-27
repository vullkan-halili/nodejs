import faker from 'faker';

export default function makeFakeUser(overrides) {
  const user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }

  return {
    ...user,
    ...overrides,
  }
}