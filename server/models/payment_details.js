const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment_details extends Model {

  }

  Payment_details.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
      },
    },
    {
      sequelize,
      modelName: 'payment_details',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return Payment_details;
}