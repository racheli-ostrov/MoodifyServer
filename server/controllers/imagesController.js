const imagesService = require('../service/imagesService');

function detectMood(url) {
  // דמו: שדרג בעתיד ל־API אמיתי או Cloudinary
  const moods = ['happy', 'sad', 'energetic', 'calm', 'romantic'];
  return moods[Math.floor(Math.random() * moods.length)];
}

exports.uploadAndDetectMood = async (req, res) => {
  const { url } = req.body;
  const user_id = req.user.id;
  if (!url) return res.status(400).json({ error: 'Missing image url' });
  const mood = detectMood(url);
  const imageId = await imagesService.createImage({ user_id, url, mood });
  res.status(201).json({ id: imageId, mood });
};

exports.getImagesByUser = async (req, res) => {
  const images = await imagesService.getImagesByUser(req.params.userId);
  res.json(images);
};