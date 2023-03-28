// import { query } from '../config/db';
// import Model from './Model';
// import TABLES from './CONFIG_DB_INFO';
// import mysql from 'mysql2/promise';

const query = require('../config/db');
const Model = require('./Model');
const TABLES = require('./CONFIG_DB_INFO');
const mysql = require('mysql2/promise');

class ProductModel extends Model {
  constructor(tableName) {
    super(tableName);
  }

  async insertProduct(params) {
    const { name, desc, image} = params;

    const result = await query(`INSERT INTO ${this.tableName} SET ?`, {
      name,
      desc,
      image,
    });
    if (result.affectedRows) {
      console.log('add success');
    } else {
      console.log('add fail');
    }
    return result;
  }

  async updateProduct(params) {
    const name = mysql.escape(params.name);
    const IDProduct = mysql.escape(params.IDProduct);
    const desc = mysql.escape(params.desc);

    const result = await query(
      `UPDATE ${this.tableName}\
        SET name = IF(${name} IS NULL, name, ${name}),\
            desc = IF(${desc} IS NULL, desc, ${desc})\
      WHERE id = ${IDProduct}`,
    );
    return result;
  }

  async deleteProduct(IDProduct) {
    const result = await query(
      `DELETE FROM ${this.tableName} WHERE id = ${IDProduct}`,
    );
    return result;
  }
}

module.exports = new ProductModel(TABLES.PRODUCT);
