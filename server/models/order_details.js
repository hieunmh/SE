const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_details extends Model {

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
        // allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      total: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
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