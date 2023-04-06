const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_details extends Model {

  }

  Order_details.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'order_details',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return Order_details;
}