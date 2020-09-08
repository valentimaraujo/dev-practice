const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { args: true, msg: 'E-mail inválido.' },
      },
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      },
    },
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateToken = () => jwt.sign({
    id: this.id,
    name: this.name,
    email: this.email,
  }, process.env.JWT_SECRET);

  return User;
};
