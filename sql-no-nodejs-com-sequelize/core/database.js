module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'secret',
  database: 'money-cicle',
  define: {
    timestamp: true,
    underscored: true,
    paranoid: true
  }
}