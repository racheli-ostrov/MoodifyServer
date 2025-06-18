const jwt = require('jsonwebtoken');
const pool = require('../../db/db');

module.exports = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'No token provided' });

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const [rows] = await pool.query(
    "SELECT id, username, name, email, role FROM users WHERE id = ?",
    [decoded.id]
  );
  if (!rows.length) {
    console.log("❌ לא נמצא משתמש עם id:", decoded.id);
    return res.status(401).json({ error: "User not found" });
  }
  const user = rows[0];
  req.user = user;
  next();
} catch (err) {
  console.error("❌ טוקן לא תקין:", err.message);
  return res.status(401).json({ error: "Invalid token" });
}

};