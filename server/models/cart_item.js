const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {}

  Cart_item.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        // allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        // allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'cart_item',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );
  return Cart_item;
};
