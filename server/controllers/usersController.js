// // const usersService = require('../service/usersService');
// // const bcrypt = require("bcryptjs");
// // const jwt = require('jsonwebtoken');
// // const { sendWelcomeEmail } = require("../utils/sendMail");

// // exports.register = async (req, res) => {
// //   console.log("REGISTER REQUEST:", req.body);
// //   const { username, password, email, name } = req.body;
// //   const role = "user";
// //   if (!username || !password || !email || !name)
// //     return res.status(400).json({ error: 'Missing fields' });
// //   try {
// //     const existingUser = await usersService.getUserByUsername(username);
// //     if (existingUser)
// //       return res.status(409).json({ error: 'Username already exists' });
// //     const hash = await bcrypt.hash(password, 10);
// //     const id = await usersService.createUser({
// //       username,
// //       password: hash,
// //       email,
// //       name,
// //       role
// //     });
// //     try {
// //       await sendWelcomeEmail(email, name);
// //     } catch (mailErr) {
// //       console.error("MAIL ERROR:", mailErr.message);
// //     }
// //     const user = await usersService.getUserByUsername(username);
// //     const token = jwt.sign(
// //       { id: user.id, username: user.username, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: '6h' }
// //     );
// //     res
// //       .cookie("token", token, {
// //         httpOnly: true,
// //         sameSite: "Lax",
// //         secure: false,
// //         path: "/", 
// //         maxAge: 1000 * 60 * 60 * 6
// //       })
// //       .status(201)
// //       .json({
// //         user: { id: user.id, username: user.username, role: user.role }
// //       });
// //   } catch (e) {
// //     console.error("REGISTER ERROR:", e.message);
// //     console.error("FULL ERROR OBJECT:", e);
// //     res.status(500).json({ error: e.message });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const { username, password } = req.body;
// //   if (!username || !password)
// //     return res.status(400).json({ error: 'Missing username or password' });
// //   try {
// //     const user = await usersService.getUserByUsername(username);
// //     if (!user) return res.status(401).json({ error: 'User not found' });
// //     const match = await bcrypt.compare(password, user.password);
// //     if (!match) return res.status(401).json({ error: 'Wrong password' });
// //     const token = jwt.sign(
// //       { id: user.id, username: user.username, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: '6h' }
// //     );
// //     res
// //       .cookie("token", token, {
// //         httpOnly: true,
// //         sameSite: "Lax",
// //         secure: false,
// //           path: "/", 
// //         maxAge: 1000 * 60 * 60 * 6
// //       })
// //       .json({
// //         user: { id: user.id, username: user.username, role: user.role }
// //       });
// //   } catch (e) {
// //     console.error("LOGIN ERROR:", e);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };

// // exports.getUserById = async (req, res) => {
// //   try {
// //     const user = await usersService.getUserById(req.params.id);
// //     if (!user) return res.status(404).json({ error: 'User not found' });
// //     res.json(user);
// //   } catch (e) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };

// // exports.logout = (req, res) => {
// //   res.clearCookie("token", {
// //     httpOnly: true,
// //     sameSite: "Lax",
// //     secure: false,
// //       path: "/", 
// //   });
// //   res.status(200).json({ message: "Logged out" });
// // };

// // exports.upgradeToPro = async (req, res) => {
// //   const userId = req.user.id;
// //   try {
// //     await usersService.upgradeToPro(userId);
// //     res.json({ success: true });
// //   } catch (err) {
// //     res.status(500).json({ error: "DB error" });
// //   }
// // };
// // exports.getMe = async (req, res) => {
// //   if (!req.user) return res.status(401).json({ error: "Not authenticated" });
// //   res.json({ user: req.user });
// // };
// import usersService from "../service/usersService.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendWelcomeEmail } from "../utils/sendMail.js";

// export const register = async (req, res) => {
//   console.log("REGISTER REQUEST:", req.body);
//   const { username, password, email, name } = req.body;
//   const role = "user";

//   if (!username || !password || !email || !name)
//     return res.status(400).json({ error: 'Missing fields' });

//   try {
//     const existingUser = await usersService.getUserByUsername(username);
//     if (existingUser)
//       return res.status(409).json({ error: 'Username already exists' });

//     const hash = await bcrypt.hash(password, 10);
//     const id = await usersService.createUser({
//       username,
//       password: hash,
//       email,
//       name,
//       role
//     });

//     try {
//       await sendWelcomeEmail(email, name);
//     } catch (mailErr) {
//       console.error("MAIL ERROR:", mailErr.message);
//     }

//     const user = await usersService.getUserByUsername(username);
//     const token = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '6h' }
//     );

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "Lax",
//         secure: false,
//         path: "/",
//         maxAge: 1000 * 60 * 60 * 6
//       })
//       .status(201)
//       .json({
//         user: { id: user.id, username: user.username, role: user.role }
//       });

//   } catch (e) {
//     console.error("REGISTER ERROR:", e.message);
//     console.error("FULL ERROR OBJECT:", e);
//     res.status(500).json({ error: e.message });
//   }
// };

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password)
//     return res.status(400).json({ error: 'Missing username or password' });

//   try {
//     const user = await usersService.getUserByUsername(username);
//     if (!user) return res.status(401).json({ error: 'User not found' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ error: 'Wrong password' });

//     const token = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '6h' }
//     );

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "Lax",
//         secure: false,
//         path: "/",
//         maxAge: 1000 * 60 * 60 * 6
//       })
//       .json({
//         user: { id: user.id, username: user.username, role: user.role }
//       });

//   } catch (e) {
//     console.error("LOGIN ERROR:", e);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const getUserById = async (req, res) => {
//   try {
//     const user = await usersService.getUserById(req.params.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (e) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "Lax",
//     secure: false,
//     path: "/",
//   });
//   res.status(200).json({ message: "Logged out" });
// };

// export const upgradeToPro = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     await usersService.upgradeToPro(userId);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: "DB error" });
//   }
// };

// export const getMe = async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "Not authenticated" });
//   res.json({ user: req.user });
// };
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendWelcomeEmail } from "../utils/sendMail.js";

// export const register = async (req, res) => {
//   console.log("REGISTER REQUEST:", req.body);
//   const { username, password, email, name } = req.body;
//   const role = "user";

//   if (!username || !password || !email || !name)
//     return res.status(400).json({ error: "Missing fields" });

//   try {
//     const existingUser = await usersService.getUserByUsername(username);
//     if (existingUser)
//       return res.status(409).json({ error: "Username already exists" });

//     const hash = await bcrypt.hash(password, 10);
//     await usersService.createUser({
//       username,
//       password: hash,
//       email,
//       name,
//       role,
//     });

//     try {
//       await sendWelcomeEmail(email, name);
//     } catch (mailErr) {
//       console.error("MAIL ERROR:", mailErr.message);
//     }

//     const user = await usersService.getUserByUsername(username);
//     const token = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "6h" }
//     );

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "Lax",
//         secure: false,
//         path: "/",
//         maxAge: 1000 * 60 * 60 * 6,
//       })
//       .status(201)
//       .json({
//         user: { id: user.id, username: user.username, role: user.role },
//       });
//   } catch (e) {
//     console.error("REGISTER ERROR:", e.message);
//     console.error("FULL ERROR OBJECT:", e);
//     res.status(500).json({ error: e.message });
//   }
// };

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password)
//     return res.status(400).json({ error: "Missing username or password" });

//   try {
//     const user = await usersService.getUserByUsername(username);
//     if (!user) return res.status(401).json({ error: "User not found" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ error: "Wrong password" });

//     const token = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "6h" }
//     );

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "Lax",
//         secure: false,
//         path: "/",
//         maxAge: 1000 * 60 * 60 * 6,
//       })
//       .json({
//         user: { id: user.id, username: user.username, role: user.role },
//       });
//   } catch (e) {
//     console.error("LOGIN ERROR:", e);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export const getUserById = async (req, res) => {
//   try {
//     const user = await usersService.getUserById(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.json(user);
//   } catch (e) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "Lax",
//     secure: false,
//     path: "/",
//   });
//   res.status(200).json({ message: "Logged out" });
// };

// export const upgradeToPro = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     await usersService.upgradeToPro(userId);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: "DB error" });
//   }
// };

// export const getMe = async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "Not authenticated" });
//   res.json({ user: req.user });
// };

// export default {
//   register,
//   login,
//   getUserById,
//   logout,
//   upgradeToPro,
//   getMe,
// };
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../utils/sendMail.js";

// === REGISTER ===
export const register = async (req, res) => {
  console.log("REGISTER REQUEST:", req.body);
  const { username, password, email, name } = req.body;

  if (!username || !password || !email || !name)
    return res.status(400).json({ error: "Missing fields" });

  try {
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ error: "Username already exists" });

    // יצירת משתמש חדש
    const newUser = new User({
      username,
      password, // הסיסמה תוצפן אוטומטית במודל
      email,
      name,
    });
    await newUser.save();

    // שליחת מייל ברוך הבא (אם יש)
    // try {
    //   await sendWelcomeEmail(email, name);
    // } catch (mailErr) {
    //   console.error("MAIL ERROR:", mailErr.message);
    // }

    // יצירת טוקן
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    // שליחת קוקי ודאטה ללקוח
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
        maxAge: 1000 * 60 * 60 * 6, // 6 שעות
      })
      .status(201)
      .json({
        user: { id: newUser._id, username: newUser.username, role: newUser.role },
      });
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
};

// === LOGIN ===
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing username or password" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
        maxAge: 1000 * 60 * 60 * 6,
      })
      .json({
        user: { id: user._id, username: user.username, role: user.role },
      });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    res.status(500).json({ error: "Server error" });
  }
};

// === GET USER BY ID ===
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};

// === LOGOUT ===
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    path: "/",
  });
  res.status(200).json({ message: "Logged out" });
};

// === UPGRADE TO PRO ===
export const upgradeToPro = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(userId, { role: "pro" }, { new: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
};

// === GET ME ===
export const getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
};

export default {
  register,
  login,
  getUserById,
  logout,
  upgradeToPro,
  getMe,
};