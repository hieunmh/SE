const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // custom method
    static associate(models) {
      User.hasMany(models.Cart_item, {
        foreignKey: 'user_id',
      });
      User.hasMany(models.User_address, {
        foreignKey: 'user_id',
      });
      User.hasMany(models.User_payment, {
        foreignKey: 'user_id',
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'users',
      timestamps: false,
    });
  return User;
};