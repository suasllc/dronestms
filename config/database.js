// server/config/database.js
const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: "sequelize",
  },
  production: {
    // use_env_variable: 'DATABASE_URL',
    use_env_variable: 'HEROKU_POSTGRESQL_COPPER_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
};
