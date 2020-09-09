module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Exam.associate = (models) => {
    Exam.belongsToMany(models.Laboratory, {
      through: 'exam_laboratories',
      as: 'laboratories',
      foreignKey: 'id_exam',
      timestamps: false,
    });
  };

  return Exam;
};
