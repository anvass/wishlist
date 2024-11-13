'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Wish.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.INTEGER,
      isCompleted: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Wish',
    }
  );
  return Wish;
};
