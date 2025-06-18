const pool = require('../../db/db');

exports.getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.createUser = async ({ username, password, email, name, role }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password, email, name, role) VALUES (?, ?, ?, ?, ?)',
      [username, password, email, name, role || 'user']
    );
    return result.insertId;
  } catch (err) {
    console.error("DB Error during user creation:", err);
    throw err;
  }
};

exports.upgradeToPro = async (userId) => {
  await pool.query("UPDATE users SET role = 'pro' WHERE id = ?", [userId]);
};

exports.getUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};
exports.getByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.create = async ({ username, password, email, name, role }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password, email, name, role) VALUES (?, ?, ?, ?, ?)',
      [username, password, email, name, role || 'user']
    );
    return result.insertId;
  } catch (err) {
    console.error("DB Error during user creation:", err);
    throw err;
  }
};