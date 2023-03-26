// import mysql from 'mysql2';
// import dotenv from 'dotenv';
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Connect to database
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

console.log('Connect to MYSQL success');
// Test function
async function query(sql, params) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

// export { query };
module.exports = query;
