// const { uploadToCloudinary } = require('../upload');
// const axios = require('axios');
// const pool = require('../../db/db');

// exports.uploadAndDetectMood = async (req, res) => {
//   console.log("Got upload request", req.file);
//   try {
//     if (!req.file) return res.status(400).json({ error: 'Missing image' });

//     const imageUrl = await uploadToCloudinary(req.file.buffer);
//     console.log("Uploaded to Cloudinary:", imageUrl);

//     const apiUrl = 'https://api-inference.huggingface.co/models/dima806/facial_emotions_image_detection';
//     const hfRes = await axios.post(
//       apiUrl,
//       { inputs: imageUrl },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           Accept: "application/json"
//         }
//       }
//     );
//     console.log("HF response:", hfRes.data);

//     let mood = "unknown";
//     if (Array.isArray(hfRes.data) && hfRes.data.length > 0) {
//       mood = hfRes.data[0].label;
//     }

//     res.status(201).json({ mood, url: imageUrl });

//   } catch (err) {
//     console.error('Upload/Detect Error:', err?.response?.data || err.message);
//     res.status(500).json({ error: 'Failed to process image', details: err?.response?.data || err.message });
//   }
// };
const { uploadToCloudinary } = require("../upload");
const axios = require("axios");
const imagesService = require("../service/imagesService");
const playlistsService = require("../service/playlistsService");
const songsService = require("../service/songsService");

exports.uploadAndDetectMood = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image" });
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const apiUrl =
      "https://api-inference.huggingface.co/models/dima806/facial_emotions_image_detection";
    const hfRes = await axios.post(
      apiUrl,
      { inputs: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    const mood = hfRes.data[0]?.label?.toLowerCase() || "unknown";

    // ✨ שמירת התמונה במסד הנתונים בלבד (לפי הבקשה)
    await imagesService.createImage({
      user_id: user.id,
      url: imageUrl,
      mood
    });

    res.status(201).json({ mood, url: imageUrl });
  } catch (err) {
    console.error("Upload/Detect Error:", err);
    res.status(500).json({
      error: "Failed to process image",
      details: err?.response?.data || err.message,
    });
  }
};

exports.getImagesByUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const images = await imagesService.getImagesByUser(userId);
    res.json(images);
  } catch (e) {
    console.error("Image fetch error:", e);
    res.status(500).json({ error: "Server error" });
  }
};