const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

  }

  Product.init(
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
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Product_category',
          key: 'id',
        }
      },
      discount_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Discount',
          key: 'id',
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sold_number: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(150),
      }
    },
    {
      sequelize,
      modelName: 'products',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });

  return Product;
};