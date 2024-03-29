const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Product_category, {
        foreignKey: 'category_id',
      });
      Product.belongsTo(models.Discount, {
        foreignKey: 'discount_id',
      });
    }
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
      },
      category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Product_category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      discount_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Discount',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
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
      },
    },
    {
      sequelize,
      modelName: 'products',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );

  return Product;
};
