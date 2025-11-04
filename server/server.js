// // // import dotenv from "dotenv";
// // // import express from "express";
// // // import cors from "cors";
// // // import axios from "axios";
// // // dotenv.config();
// // // require('dotenv').config();
// // // const express = require('express');
// // // const cors = require('cors');
// // // const path = require('path');
// // // const cookieParser = require('cookie-parser');

// // // const usersRoutes = require('./routes/users');
// // // const imagesRoutes = require('./routes/images');
// // // const playlistsRoutes = require('./routes/playlists');
// // // const authRoutes = require('./routes/auth');
// // // const uploadRoutes = require('./routes/upload');
// // // const paypalRoutes = require('./routes/payPal');

// // // const app = express();

// // // app.use(cors({
// // //   origin: process.env.CLIENT_URL || 'http://localhost:5173',
// // //   credentials: true
// // // }));

// // // app.use(express.json());
// // // app.use(cookieParser());
// // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // // app.use('/api/upload', uploadRoutes);
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/users', usersRoutes);
// // // app.use('/api/images', imagesRoutes);
// // // app.use('/api/playlists', playlistsRoutes);
// // // app.use('/api/paypal', paypalRoutes);
// // // app.get('/', (req, res) => res.send('Moodify API'));

// // // const PORT = process.env.PORT || 3000;
// // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // import dotenv from "dotenv";
// // // import express from "express";
// // // import cors from "cors";
// // // import path from "path";
// // // import cookieParser from "cookie-parser";
// // // import { fileURLToPath } from "url";

// // // dotenv.config();

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // import usersRoutes from "./routes/users.js";
// // // import imagesRoutes from "./routes/images.js";
// // // import playlistsRoutes from "./routes/playlists.js";
// // // import authRoutes from "./routes/auth.js";
// // // import uploadRoutes from "./routes/upload.js";
// // // import paypalRoutes from "./routes/payPal.js";

// // // const app = express();

// // // app.use(
// // //   cors({
// // //     origin: [
// // //       "http://localhost:5173",
// // //       "https://modif.netlify.app"
// // //     ],
// // //     credentials: true,
// // //   })
// // // );


// // // app.use(express.json());
// // // app.use(cookieParser());

// // // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // app.use("/api/upload", uploadRoutes);
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/users", usersRoutes);
// // // app.use("/api/images", imagesRoutes);
// // // app.use("/api/playlists", playlistsRoutes);
// // // app.use("/api/paypal", paypalRoutes);

// // // app.get("/", (req, res) => res.send("Moodify API"));


// // // const PORT = process.env.PORT || 3000;
// // // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
// // import dotenv from "dotenv";
// // import express from "express";
// // import cors from "cors";
// // import path from "path";
// // import cookieParser from "cookie-parser";
// // import { fileURLToPath } from "url";
// // import mongoose from "mongoose"; // ← הוספנו

// // dotenv.config();

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log("✅ Connected to MongoDB Atlas"))
// //   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // import usersRoutes from "./routes/users.js";
// // import imagesRoutes from "./routes/images.js";
// // import playlistsRoutes from "./routes/playlists.js";
// // import authRoutes from "./routes/auth.js";
// // import uploadRoutes from "./routes/upload.js";
// // import paypalRoutes from "./routes/payPal.js";
// // import cors from "cors";

// // const app = express();


// // const allowedOrigins = [
// //   "http://localhost:5173",
// //   "https://moodify-ashy-chi.vercel.app",
// // ];

// // app.use(
// //   cors({
// //     origin: function (origin, callback) {
// //       if (!origin || allowedOrigins.includes(origin)) {
// //         callback(null, true);
// //       } else {
// //         console.log("❌ Blocked by CORS:", origin);
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     credentials: true,
// //   })
// // );


// // app.use(express.json());
// // app.use(cookieParser());
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // app.use("/api/upload", uploadRoutes);
// // app.use("/api/auth", authRoutes);
// // app.use("/api/users", usersRoutes);
// // app.use("/api/images", imagesRoutes);
// // app.use("/api/playlists", playlistsRoutes);
// // app.use("/api/paypal", paypalRoutes);

// // app.get("/", (req, res) => res.send("Moodify API"));

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import path from "path";
// import cookieParser from "cookie-parser";
// import { fileURLToPath } from "url";
// import mongoose from "mongoose";

// import usersRoutes from "./routes/users.js";
// import imagesRoutes from "./routes/images.js";
// import playlistsRoutes from "./routes/playlists.js";
// import authRoutes from "./routes/auth.js";
// import uploadRoutes from "./routes/upload.js";
// import paypalRoutes from "./routes/payPal.js";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 🧩 התחברות ל־MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // 🧩 אפליקציית Express
// const app = express();

// // 🧩 הגדרת מקורות מותרים ל־CORS
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://moodify-ashy-chi.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.log("❌ Blocked by CORS:", origin);
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // 🧩 הגדרות בסיסיות
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 🧩 ראוטים
// app.use("/api/upload", uploadRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/images", imagesRoutes);
// app.use("/api/playlists", playlistsRoutes);
// app.use("/api/paypal", paypalRoutes);

// // 🧩 דף ברירת מחדל
// app.get("/", (req, res) => res.send("Moodify API running 🚀"));

// // 🧩 הפעלת השרת
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ חיבור למסד הנתונים
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ ייבוא הראוטים
import usersRoutes from "./routes/users.js";
import imagesRoutes from "./routes/images.js";
import playlistsRoutes from "./routes/playlists.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import paypalRoutes from "./routes/payPal.js";

const app = express();

// ✅ הגדרת CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://moodify-ashy-chi.vercel.app",
  "https://moodify-do1vvqqfh-rachelis-projects-0bf03696.vercel.app",
   /\.vercel\.app$/,
];

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://moodify-ashy-chi.vercel.app",
        /\.vercel\.app$/, // מאפשר כל דומיין של vercel.app
      ];

      // אם אין origin (למשל בבדיקות Postman) או שהוא מותר — מאשר
      if (
        !origin ||
        allowedOrigins.some((o) =>
          typeof o === "string" ? o === origin : o.test(origin)
        )
      ) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


console.log("✅ CORS configured for:", allowedOrigins.join(", "));

// ✅ מידלווארים
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ ראוטים
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/paypal", paypalRoutes);

// ✅ ברירת מחדל
app.get("/", (req, res) => res.send("Moodify API - Backend is live ✅"));

// ✅ הרצת השרת
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
