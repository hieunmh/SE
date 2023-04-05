const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product_inventory extends Model {

  }

  Product_inventory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'product_inventory',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return Product_inventory;
}