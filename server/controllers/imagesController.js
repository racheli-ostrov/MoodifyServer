console.log("Got upload request", req.file);
const { uploadToCloudinary } = require('../upload');
const axios = require('axios');
const pool = require('../../db/db');

exports.uploadAndDetectMood = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Missing image' });

    // שלב 1: העלאה ל-Cloudinary
    const imageUrl = await uploadToCloudinary(req.file.buffer);
    console.log("Uploaded to Cloudinary:", imageUrl);

    // שלב 2: שליחה ל-HuggingFace (מודל רגשות מתמונה)
    const apiUrl = 'https://api-inference.huggingface.co/models/taesiri/image-emotion-classifier';
    const hfRes = await axios.post(
      apiUrl,
      { inputs: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          Accept: "application/json"
        }
      }
    );
    console.log("HF response:", hfRes.data);

    // תוצאת הרגש הכי חזק
    let mood = "unknown";
    if (Array.isArray(hfRes.data) && hfRes.data.length > 0 && Array.isArray(hfRes.data[0]) && hfRes.data[0].length > 0) {
      mood = hfRes.data[0][0].label;
    }

    // שלב 3: שמירה ב-DB (אופציונלי)
    // const [result] = await pool.query(
    //   'INSERT INTO images (url, mood) VALUES (?, ?)',
    //   [imageUrl, mood]
    // );

    res.status(201).json({ mood, url: imageUrl });
  } catch (err) {
    console.error('Upload/Detect Error:', err?.response?.data || err);
    res.status(500).json({ error: 'Failed to process image', details: err?.response?.data || err.message });
  }
};