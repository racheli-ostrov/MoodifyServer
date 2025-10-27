// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const streamifier = require('streamifier');
// require('dotenv').config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (result) resolve(result.secure_url);
//       else reject(error);
//     });
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

// module.exports = { upload, uploadToCloudinary };
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// אחסון בזיכרון — מאפשר העלאה ישירות ל-Cloudinary בלי לשמור קובץ זמני
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// פונקציה שמעלה את התמונה ל-Cloudinary
export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result.secure_url);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};