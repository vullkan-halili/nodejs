import dotenv from 'dotenv';

dotenv.config()

const config = {
  app: {
    port: process.env.APP_PORT,
  },
  db: {
    main: {
      name: process.env.DB_NAME,
      url: process.env.DB_URL,
    },
    test: {
      name: process.env.TEST_DB_NAME,
      url: process.env.TEST_DB_URL,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}

module.exports = config;