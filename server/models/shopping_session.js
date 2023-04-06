const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shopping_session extends Model {

  }

  Shopping_session.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'shopping_session',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    });
  return Shopping_session;
}