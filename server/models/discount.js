const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {

    static associate(models) {
      Discount.hasMany(models.Product, {
        foreignKey: 'discount_id',
      });
    }
  }

  Discount.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'discount',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );
  return Discount;
};
