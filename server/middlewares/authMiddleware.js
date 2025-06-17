// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.cookies?.token;
// const authHeader = req.headers["authorization"];
//   // const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(401).json({ error: 'No token' });
//   // const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token' });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.cookies?.token;
//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };
const jwt = require('jsonwebtoken');
const pool = require('../../db/db');

module.exports = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // שלוף את המשתמש המלא מהדאטהבייס
    const [rows] = await pool.query(
      "SELECT id, username, name, email, role FROM users WHERE id = ?",
      [decoded.id]
    );
    if (!rows.length) return res.status(401).json({ error: 'User not found' });
    req.user = rows[0];
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};