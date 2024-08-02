import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME || 'postgres', process.env.DB_USER || 'nafiu', process.env.DB_PASSWORD || 'Angka#1toks', {
  host: 'localhost',
  dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  port: 3001,
});

export default sequelize;