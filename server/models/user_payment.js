const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_payment extends Model {

  }

  User_payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'user_payment',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return User_payment;
}