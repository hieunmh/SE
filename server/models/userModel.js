// import { query } from '../config/db';
// import Model from './Model';
// import TABLES from './CONFIG_DB_INFO';
// import mysql from 'mysql2/promise';
const query = require('../config/db');
const Model = require('./Model');
const TABLES = require('./CONFIG_DB_INFO');
const mysql = require('mysql2/promise');

class UserModel extends Model {
  constructor(tableName) {
    super(tableName);
  }

  async registerAccount(params) {
    console.log("regist");
    const { email, password, name, telephone } = params;
    // default role = 0 =>  user
    const sql = `INSERT INTO ${this.tableName} (email, password, name, telephone, role)\
                  VALUES ('${email}', '${password}', '${name}', '${telephone}', 0)`;
    return await query(sql);
  }
}

module.exports = new UserModel(TABLES.CUSTOMER);