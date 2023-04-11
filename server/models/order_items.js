const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_items extends Model {}

  Order_items.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        // allowNull: false,
        references: {
          model: 'Order_details',
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
      modelName: 'order_items',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );
  return Order_items;
};
