const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%yahoo.com.br'
        }
      },
      include: [
        {association: 'addresses', where: {street: 'Rua Maria Abadia dos Santos'}},
        {
          association: 'techs',
          required: false,
          where: {
          name: {
            [Op.like]: 'react%'
          }
        }},
      ]
    });
    
    
    return res.json(users);
  }
}