const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_address extends Model {

  }

  User_address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'user_address',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return User_address;
}