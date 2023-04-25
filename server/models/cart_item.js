const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    static associate(models) {
      Cart_item.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Cart_item.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
    }
  }

  Cart_item.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
