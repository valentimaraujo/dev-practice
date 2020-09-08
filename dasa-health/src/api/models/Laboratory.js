module.exports = (sequelize, DataTypes) => {
  const Laboratory = sequelize.define('Laboratory', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  });

  Laboratory.associate = (models) => {
    Laboratory.belongsToMany(models.Exam, {
      through: 'exam_laboratories',
      as: 'exams',
      foreignKey: 'id_laboratory',
      timestamps: false,
    });
  };

  return Laboratory;
};
