const AuthRepository = require('../repositories/AuthRepository');

class AuthController {
  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await AuthRepository.auth(email, password);

      if (user.error) {
        return res.status(401).send(user.error);
      }

      return res.json(user);
    } catch (e) {
      res.status(401).send({ error: 'Unauthorized user (cod. 4)' });
    }
  }
}

module.exports = new AuthController();
