module.exports = (sequelize, DataTypes) => {
  const Laboratory = sequelize.define('Laboratory', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
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
