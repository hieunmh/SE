module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('customer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      telephone: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });

  return User;

};