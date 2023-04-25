const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_payment extends Model {
    static associate(models) {
      User_payment.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }

  User_payment.init(
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
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      payment_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      account_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiry: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user_payment',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );
  return User_payment;
};
