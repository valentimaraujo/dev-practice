'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      sponsored_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      document: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
