const usersService = require('../service/usersService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require("../utils/sendMail");

exports.register = async (req, res) => {
  console.log("REGISTER REQUEST:", req.body);
  const { username, password, email, name, role } = req.body;

  if (!username || !password || !email || !name)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    const existingUser = await usersService.getUserByUsername(username);
    if (existingUser)
      return res.status(409).json({ error: 'Username already exists' });

    const hash = await bcrypt.hash(password, 10);
    const id = await usersService.createUser({
      username,
      password: hash,
      email,
      name,
      role
    });
try {
  await sendWelcomeEmail(email, name);
} catch (mailErr) {
  console.error("MAIL ERROR:", mailErr.message);
  // אפשר להמשיך בלי להכשיל את ההרשמה
}
    res.status(201).json({ id });
  }catch (e) {
  console.error("REGISTER ERROR:", e.message);
  console.error("FULL ERROR OBJECT:", e);
  res.status(500).json({ error: e.message }); // הצג את הודעת השגיאה ללקוח (זמנית)
}

};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password' });

  try {
    const user = await usersService.getUserByUsername(username);
    if (!user) return res.status(401).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};