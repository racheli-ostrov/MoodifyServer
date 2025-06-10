require("dotenv").config();
const mysql = require("mysql2/promise");

async function testConnection() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    console.log("✔ Connected to database successfully");
    await conn.end();
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error(err.message);
  }
}

testConnection();
