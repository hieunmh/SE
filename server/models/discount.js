const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {

  }

  Discount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      discount_percent: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'discount',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return Discount;
}