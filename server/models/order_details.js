const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_details extends Model {
    static associate(models) {
      Order_details.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Order_details.hasMany(models.Order_items, {
        foreignKey: 'order_id',
      });
    }
  }

  Order_details.init(
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      total: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Đang xử lý', 'Đang giao hàng', 'Đã giao hàng'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'order_details',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );
  return Order_details;
};
