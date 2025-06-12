const playlistsService = require('../service/playlistsService');
const songsService = require('../service/songsService');
const router = require("express").Router();

// function sampleSongs(mood) {
//   const lib = {
//     happy: [
//       { title: "Happy Song", artist: "Fun Band", url: "https://youtube.com/happy" },
//       { title: "Smiles", artist: "Sunny", url: "https://youtube.com/smiles" }
//     ],
//     sad: [
//       { title: "Blue Mood", artist: "Sad Singer", url: "https://youtube.com/blue" }
//     ],
//     calm: [
//       { title: "Relaxation", artist: "CalmArtist", url: "https://youtube.com/relax" }
//     ],
//     energetic: [
//       { title: "Power Up", artist: "Fast Beat", url: "https://youtube.com/power" }
//     ],
//     romantic: [
//       { title: "Love Tune", artist: "Romantic Singer", url: "https://youtube.com/love" }
//     ]
//   };
//   return lib[mood] || lib.happy;
// }

exports.createPlaylist = async (req, res) => {
  const { image_id, mood, name, description } = req.body;
  const user_id = req.user.id;
  let finalMood = mood;
  if (!finalMood && image_id) finalMood = await playlistsService.getMoodFromImage(image_id);
  if (!finalMood) return res.status(400).json({ error: 'Mood required' });
  const playlistId = await playlistsService.createPlaylist({
    user_id, image_id, mood: finalMood, name: name || finalMood + " Playlist", description
  });
  // הוספת שירים דוגמה
  const songs = sampleSongs(finalMood);
  for (const song of songs) await songsService.addSong({ playlist_id: playlistId, ...song });
  res.status(201).json({ id: playlistId, songs });
};

exports.getByUser = async (req, res) => {
  const playlists = await playlistsService.getByUserId(req.params.userId);
  res.json(playlists);
};

exports.getById = async (req, res) => {
  const playlist = await playlistsService.getById(req.params.id);
  if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
  playlist.songs = await songsService.getByPlaylist(playlist.id);
  res.json(playlist);
};

router.get("/bymood/:mood", async (req, res) => {
  const mood = req.params.mood;
  try {
    const playlists = await playlistsService.getByMood(mood);
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בשרת" });
  }
});

// exports.getByMood = async (req, res) => {
//   const mood = req.params.mood;
//   try {
//     const playlists = await playlistsService.getByMood(mood);
//     res.json(playlists);
//   } catch (err) {
//     console.error("שגיאה בקבלת פלייליסט לפי מצב רוח:", err);
//     res.status(500).json({ error: "שגיאה בשרת", details: err.message });
//   }
// };

exports.getByMood = async (req, res) => {
  // ננקה את מצב הרוח מרווחים ונהפוך לאותיות קטנות
  const mood = req.params.mood.trim().toLowerCase();
  try {
    // שלב 1: נשלוף פלייליסטים עם השוואה לפי מצב רוח
    const playlists = await playlistsService.getByMood(mood);

    if (playlists.length === 0)
      return res.status(404).json({ error: "לא נמצא פלייליסט עבור הרגש הזה" });

    const playlist = playlists[0]; // ניקח את הראשון בלבד

    // שלב 2: נטען את השירים באותו playlist_id
    const songs = await songsService.getByPlaylist(playlist.id);
    playlist.songs = songs;

    res.json(playlist);
  } catch (err) {
    console.error("❌ שגיאה בקבלת פלייליסט לפי מצב רוח:", err);
    res.status(500).json({ error: "שגיאה בשרת", details: err.message });
  }
};
