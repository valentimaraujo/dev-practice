const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: { association: 'addresses' }
    });
    
    return res.json(user.addresses);
  },
  
  async store(req, res) {
    const { user_id } = req.params;
    const {
      street, number, complement, neighborhood, city, state, zipcode
    } = req.body;
    
    const user = await User.findByPk(user_id);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const address = await Address.create({
      user_id, street, number, complement, neighborhood, city, state, zipcode
    });
    
    return res.json(address);
  }
}