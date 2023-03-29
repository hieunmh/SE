const query = require('../config/db');
const Model = require('./Model');
const TABLES = require('./CONFIG_DB_INFO');
const mysql = require('mysql2/promise');

class orderModel extends Model {
  constructor(tableName) {
    super(tableName);
  }

}

module.exports = new orderModel(TABLES.ORDER);