// // require('dotenv').config();
// // const { OAuth2Client } = require('google-auth-library');
// // const usersService = require('../service/usersService');
// // const jwt = require('jsonwebtoken');
// // const { sendWelcomeEmail } = require("../utils/sendMail");

// // const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

// // exports.googleLogin = async (req, res) => {
// //   try {
// //     const { token } = req.body;
// //     if (!token) return res.status(400).json({ error: "Missing token" });
// //     const ticket = await client.verifyIdToken({
// //       idToken: token,
// //       audience: process.env.VITE_GOOGLE_CLIENT_ID,
// //     });
// //     const payload = ticket.getPayload();
// //     const { email, name } = payload;
// //     if (!email || !name) return res.status(400).json({ error: "Invalid Google payload" });
// //     let user = await usersService.getByEmail(email);
// //     let isNewUser = false;
// //     if (!user) {
// //       await usersService.create({
// //         username: email,
// //         email,
// //         name,
// //         password: null,
// //         role: "user",
// //       });
// //       user = await usersService.getByEmail(email);
// //       isNewUser = true;
// //     }
// //     if (isNewUser) {
// //       try {
// //         await sendWelcomeEmail(user.email, user.name);
// //       } catch (mailErr) {
// //         console.error("MAIL ERROR (Google):", mailErr.message);
// //       }
// //     }
// //     const jwtToken = jwt.sign(
// //       { id: user.id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );
// //  res
// //     .cookie("token", jwtToken, {
// //       httpOnly: true,
// //       sameSite: "Lax",
// //       secure: false, 
// //       path: "/",
// //       maxAge: 1000 * 60 * 60 * 6
// //     })
// //     .json({ user });
// //   } catch (err) {
// //     console.error("Google login error:", err);
// //     res.status(500).json({ error: "Google login failed" });
// //   }
// // };
// import axios from "axios";
// import jwt from "jsonwebtoken";
// import pool from "../../db/db.js";

// export async function googleLogin(req, res) {
//   try {
//     const { token } = req.body;
//     const googleResponse = await axios.get(
//       `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
//     );

//     const { email, name, sub } = googleResponse.data;

//     // בודקים אם המשתמש כבר קיים
//     const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
//     let user;

//     if (rows.length) {
//       user = rows[0];
//     } else {
//       const [result] = await pool.query(
//         "INSERT INTO users (username, email, name, password, role, google_id) VALUES (?, ?, ?, ?, ?, ?)",
//         [email, email, name, "", "user", sub]
//       );
//       const [newUserRows] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
//       user = newUserRows[0];
//     }

//     // יוצרים טוקן JWT
//     const jwtToken = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "6h" }
//     );

//     res
//       .cookie("token", jwtToken, {
//         httpOnly: true,
//         sameSite: "None",
//         secure: true,
//         path: "/",
//         maxAge: 1000 * 60 * 60 * 6
//       })
//       .json({
//         user: { id: user.id, username: user.username, role: user.role },
//       });
//   } catch (error) {
//     console.error("Google Login Error:", error.message);
//     res.status(500).json({ error: "Google login failed" });
//   }
// }
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import pool from "../../db/db.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleLogin(req, res) {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Missing token" });

    // אימות רשמי מול Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    if (!email) return res.status(400).json({ error: "Invalid Google payload" });

    // בדיקת משתמש קיים
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    let user;

    if (rows.length) {
      user = rows[0];
    } else {
      const [result] = await pool.query(
        "INSERT INTO users (username, email, name, password, role, google_id) VALUES (?, ?, ?, ?, ?, ?)",
        [email, email, name, "", "user", sub]
      );
      const [newUserRows] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
      user = newUserRows[0];
    }

    // יצירת טוקן JWT
    const jwtToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 6
      })
      .json({
        user: { id: user.id, username: user.username, role: user.role },
      });
  } catch (error) {
    console.error("Google Login Error:", error.message);
    res.status(500).json({ error: "Google login failed" });
  }
}
