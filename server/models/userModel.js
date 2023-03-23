// import { query } from '../config/db';
// import Model from './Model';
// import TABLES from './CONFIG_DB_INFO';
// import mysql from 'mysql2/promise';
const query = require('../config/db');
const Model = require('./Model');
const TABLES = require('./CONFIG_DB_INFO');
const mysql = require('mysql2/promise');

class UserModel extends Model{
  constructor(tableName) {
    super(tableName);
  }
}

// export default new UserModel(TABLES.USERS);
module.exports = new UserModel(TABLES.USERS);