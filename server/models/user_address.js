const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_address extends Model {
    static associate(models) {
      User_address.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }

  User_address.init(
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
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user_address',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    },
  );
  return User_address;
};
