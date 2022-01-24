const mysql = require('mysql2')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000;
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10 
});

// console.log(process.env.secret_key)
module.exports = pool;