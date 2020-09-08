const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('secret', 8);

    return queryInterface.bulkInsert('users', [{
      name: 'Dasa Health',
      email: 'dasa-health@dasahealth.com',
      username: 'dasa-health',
      password,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
