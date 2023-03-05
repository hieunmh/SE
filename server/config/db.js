import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Connect to database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise()

// Test function
async function getProducts() {
  const [rows] = await pool.query("SELECT * FROM notes")
  return rows
}



export {
  getProducts,
};
