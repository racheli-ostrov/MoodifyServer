// const { uploadToCloudinary } = require("../upload");
// const axios = require("axios");
// const imagesService = require("../service/imagesService");
// const playlistsService = require("../service/playlistsService");
// const songsService = require("../service/songsService");

// exports.uploadAndDetectMood = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "Missing image" });
//     const user = req.user;
//     if (!user) return res.status(401).json({ error: "Unauthorized" });
//     const imageUrl = await uploadToCloudinary(req.file.buffer);
//     const apiUrl =
//       "https://api-inference.huggingface.co/models/dima806/facial_emotions_image_detection";
//     const hfRes = await axios.post(
//       apiUrl,
//       { inputs: imageUrl },
//       // {
//       //   headers: {
//       //     Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//       //     Accept: "application/json",
//       //   },
//       // }
//     );
//     const mood = hfRes.data[0]?.label?.toLowerCase() || "unknown";
//     await imagesService.createImage({
//       user_id: user.id,
//       url: imageUrl,
//       mood
//     });

//     res.status(201).json({ mood, url: imageUrl });
//   } catch (err) {
//     console.error("Upload/Detect Error:", err);
//     res.status(500).json({
//       error: "Failed to process image",
//       details: err?.response?.data || err.message,
//     });
//   }
// };

// exports.getImagesByUser = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     const images = await imagesService.getImagesByUser(userId);
//     res.json(images);
//   } catch (e) {
//     console.error("Image fetch error:", e);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.deleteImage = async (req, res) => {
//   const userId = req.user.id;
//   const imageId = req.params.id;
//   try {
//     await imagesService.deleteImage(imageId, userId);
//     res.json({ success: true });
//   } catch (e) {
//     console.error("Image delete error:", e);
//     res.status(500).json({ error: "Server error" });
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

    const apiUrl = "https://api-inference.huggingface.co/models/dima806/facial_emotions_image_detection";
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

    await imagesService.createImage({
      user_id: user.id,
      url: imageUrl,
      mood
    });

    res.status(201).json({ mood, url: imageUrl });

  } catch (err) {
    console.error("Upload/Detect Error:", err.message);
    console.error("Details:", err?.response?.data || err);
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

exports.deleteImage = async (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.id;
  try {
    await imagesService.deleteImage(imageId, userId);
    res.json({ success: true });
  } catch (e) {
    console.error("Image delete error:", e);
    res.status(500).json({ error: "Server error" });
  }
};