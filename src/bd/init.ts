/* eslint-disable no-console */
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import * as models from './models';
dotenv.config();

if (!process.env.EDB_URL) {
  throw new Error('EDB_URL is not defined in the environment variables.');
}
export const sequelize = new Sequelize(process.env.EDB_URL, {
  models: Object.values(models),
  dialectOptions: {
    ssl: true,
  },
});

export const connect = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
