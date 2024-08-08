const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": process.env.DB_USER || 'root',
    "password": process.env.DB_PASSWORD || '',
    "database": process.env.DB_NAME || 'database',
    "host": process.env.DB_HOST || '127.0.0.1',
    "dialect": process.env.DB_DIALECT || 'postgres',
    "port": process.env.DB_PORT || '3001'
  },
}
