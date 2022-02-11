require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER || "user",
  database: process.env.DATABASE || "db",
  password: process.env.PASSWORD,
  host: process.env.HOST || "localhost",
  port: process.env.PORT || "5432",
});

module.exports = { pool };
