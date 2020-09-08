require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const ENV = process.env;

module.exports = {
  host: ENV.DB_HOST,
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  dialect: ENV.DB_DIALECT || 'mysql',
  storage: './__tests__/database.sqlite',
  operatorsAliases: 0,
  logging: true,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
    paranoid: true,
  },
};
