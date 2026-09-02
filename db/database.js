const mysql = require("mysql2/promise");

// https://sidorares.github.io/node-mysql2/docs
const DB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = DB;