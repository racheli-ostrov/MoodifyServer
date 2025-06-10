const pool = require('../../db/db');

/**
 * מחזיר משתמש לפי מזהה
 */
exports.getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

/**
 * מחזיר משתמש לפי שם משתמש
 */
exports.getUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

/**
 * יוצר משתמש חדש בטבלה
 */
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

/**
 * מחזיר את כל המשתמשים (למטרות ניהול/בדיקה)
 */
exports.getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, username, name, email, role FROM users');
  return rows;
};