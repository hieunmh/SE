const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_items extends Model {

  }

  Order_items.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'order_items',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return Order_items;
}