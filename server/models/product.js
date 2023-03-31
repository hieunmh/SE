const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      inventory_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      price: {
        type: DataTypes.DECIMAL(6, 0),
        allowNull: false
      },
      discount_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      sold_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      image: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'products',
      timestamps: true,
      updateAt: false
    });

  return Product;
};