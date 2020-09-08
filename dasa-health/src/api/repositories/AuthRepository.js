const { User } = require('../models');

class AuthRepository {
  async auth(email, password) {
    try {
      const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: {
          email,
        },
      });

      if (!user) {
        return { error: 'Unauthorized user (cod. 1)' };
      }

      if (!(await user.checkPassword(password))) {
        return { error: 'Unauthorized user (cod. 2)' };
      }

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: user.generateToken(),
      };
    } catch (e) {
      return { error: 'Unauthorized user (cod. 3)' };
    }
  }
}

module.exports = new AuthRepository();
