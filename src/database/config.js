/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: 'sequelize'
  },
};
