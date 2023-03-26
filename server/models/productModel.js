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
    const { title, contents } = params;

    const result = await query(`INSERT INTO ${this.tableName} SET ?`, {
      title,
      contents,
    });
    if (result.affectedRows) {
      console.log('delete success');
    } else {
      console.log('delete fail');
    }
    return result;
  }

  async updateProduct(params) {
    const title = mysql.escape(params.title);
    const IDProduct = mysql.escape(params.IDProduct);
    const contents = mysql.escape(params.contents);

    const result = await query(
      `UPDATE ${this.tableName}\
        SET title = IF(${title} IS NULL, title, ${title}),\
            contents = IF(${contents} IS NULL, contents, ${contents})\
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
