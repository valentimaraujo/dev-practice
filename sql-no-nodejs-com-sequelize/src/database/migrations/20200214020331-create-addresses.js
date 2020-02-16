'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      street: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      number: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      complement: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      neighborhood: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      zipcode: {
        type: Sequelize.STRING(10),
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
    return queryInterface.dropTable('addresses');
  }
};
