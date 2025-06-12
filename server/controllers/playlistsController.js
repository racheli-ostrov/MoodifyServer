const playlistsService = require('../service/playlistsService');
const songsService = require('../service/songsService');
const router = require("express").Router();
const pool = require('../../db/db');

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

exports.votePlaylist = async (req, res) => {
  try {
    const { id } = req.params; // playlist id
    const { vote } = req.body; // 'like' או 'dislike'
    const userId = req.user.id; // מהטוקן

     if (vote !== "like" && vote !== "dislike")
      return res.status(400).json({ error: "Invalid vote" });
    // בדוק אם המשתמש כבר הצביע
    const [rows] = await pool.query(
      "SELECT vote FROM playlist_votes WHERE user_id = ? AND playlist_id = ?",
      [userId, id]
    );
    const prevVote = rows[0]?.vote;

    if (!prevVote) {
      // הוספת הצבעה חדשה
      await pool.query(
        "INSERT INTO playlist_votes (user_id, playlist_id, vote) VALUES (?, ?, ?)",
        [userId, id, vote]
      );
      await pool.query(
        `UPDATE playlists SET ${vote}s = ${vote}s + 1 WHERE id = ?`,
        [id]
      );
    } else if (prevVote === vote) {
      // לחץ שוב על אותה הצבעה – לא משנים כלום
      return res.json({ likes: playlist.likes, dislikes: playlist.dislikes });
    } else {
      // החליף הצבעה – מעדכנים את שתיהן
      await pool.query(
        "UPDATE playlist_votes SET vote = ? WHERE user_id = ? AND playlist_id = ?",
        [vote, userId, id]
      );
      // מוסיפים לחדש, מורידים מישן
      await pool.query(
        `UPDATE playlists SET ${vote}s = ${vote}s + 1, ${prevVote}s = ${prevVote}s - 1 WHERE id = ?`,
        [id]
      );
    }

 // מחזירים את הערכים החדשים
    const [playlistRows] = await pool.query(
      "SELECT likes, dislikes FROM playlists WHERE id = ?",
      [id]
    );
    res.json(playlistRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
};

