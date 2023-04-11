const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      noPrimaryKey: true,
    },
    logging: false,
  },
);

db.sequelize = sequelize;
db.models = {};

db.models.Cart_item = require('./cart_item')(sequelize, Sequelize.DataTypes);
db.models.Order_details = require('./order_details')(
  sequelize,
  Sequelize.DataTypes,
);
db.models.Order_items = require('./order_items')(
  sequelize,
  Sequelize.DataTypes,
);

db.models.Discount = require('./discount')(sequelize, Sequelize.DataTypes);
db.models.Product_category = require('./product_category')(
  sequelize,
  Sequelize.DataTypes,
);
db.models.Product = require('./product')(sequelize, Sequelize.DataTypes);

db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.User_address = require('./user_address')(
  sequelize,
  Sequelize.DataTypes,
);
db.models.User_payment = require('./user_payment')(
  sequelize,
  Sequelize.DataTypes,
);

module.exports = db;
