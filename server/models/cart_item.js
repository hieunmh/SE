const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {

  }

  Cart_item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
      },
    },
    {
      sequelize,
      modelName: 'cart_item',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return Cart_item;
}