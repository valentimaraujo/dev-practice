module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('exam_laboratories', {
    id_exam: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'exams', key: 'id' },
      onDelete: 'CASCADE',
    },
    id_laboratory: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'laboratories', key: 'id' },
      onDelete: 'CASCADE',
    },
  }),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('exam_laboratories'),
};
