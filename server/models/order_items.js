const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_items extends Model {
    static associate(models) {
      Order_items.belongsTo(models.Order_details, {
        foreignKey: 'order_id',
      });
      Order_items.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
    }
  }

  Order_items.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Order_details',
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
      modelName: 'order_items',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );
  return Order_items;
};
