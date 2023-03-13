import dotenv from 'dotenv';
dotenv.config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

export const dbConfig = {
  HOST: 'localhost', // for standalone
  // HOST: '172.17.0.1', // for container
  USER: POSTGRES_USER,
  PASSWORD: POSTGRES_PASSWORD,
  DB: POSTGRES_DB,
  PORT: POSTGRES_PORT,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
