require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const usersService = require('../service/usersService');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require("../utils/sendMail");

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Missing token" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    if (!email || !name) return res.status(400).json({ error: "Invalid Google payload" });

    let user = await usersService.getByEmail(email);
    let isNewUser = false;

    if (!user) {
      await usersService.create({
        username: email,
        email,
        name,
        password: null,
        role: "user",
      });
      user = await usersService.getByEmail(email);
      isNewUser = true;
    }

    // שליחת מייל רק למשתמש חדש
    if (isNewUser) {
      try {
        await sendWelcomeEmail(user.email, user.name);
      } catch (mailErr) {
        console.error("MAIL ERROR (Google):", mailErr.message);
        // לא עוצרים את התהליך אם יש בעיה בשליחת מייל
      }
    }

    const jwtToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("🔑 מחזיר ללקוח:", {
      token: jwtToken,
      user
    });

    res.json({
      token: jwtToken,
      user,
    });

  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ error: "Google login failed" });
  }
};