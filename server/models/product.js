module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      inventory_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      price: {
        type: DataTypes.DECIMAL(6, 0),
        allowNull: false
      },
      discount_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      sold_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      image: {
        type: DataTypes.TEXT
      }
    },
    {
      freezeTableName: true,
      updateAt: false
    });

  return Product;
};