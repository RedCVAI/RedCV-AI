const pool = require("../config/db");

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Koneksi database berhasil!");
    connection.release();
  } catch (err) {
    console.error("Gagal koneksi ke database:", err);
  }
}

testConnection();
