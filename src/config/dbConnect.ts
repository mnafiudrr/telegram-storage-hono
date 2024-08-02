import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'postgres';
const dbUser = process.env.DB_USER || 'nafiu';
const dbPassword = process.env.DB_PASSWORD || 'Angka#1toks';
const dbHost = process.env.DB_HOST || 'localhost';
const dbDialect = 'postgres';
const dbPort = process.env.DB_PORT || '3001';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  port: parseInt(dbPort as string),
});

export default sequelize;