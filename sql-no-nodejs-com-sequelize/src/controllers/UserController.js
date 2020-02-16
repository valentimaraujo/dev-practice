const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    
    return res.json(users);
  },
  
  async store(req, res) {
    const {
      sponsored_id, name, email, username, password, document, street, number, complement, neighborhood, city, state, zipcode
    } = req.body;
    
    const user = await User.create({
      sponsored_id, name, email, username, password, document, street, number, complement, neighborhood, city, state, zipcode
    });
    
    return res.json(user);
  }
}