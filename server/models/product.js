const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

  }

  Product.init(
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
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Product_category',
          key: 'id',

        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Discount',
          key: 'id',

        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      sold_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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