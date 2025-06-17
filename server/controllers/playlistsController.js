// const playlistsService = require('../service/playlistsService');
// const songsService = require('../service/songsService');
// // const router = require("express").Router();
// const pool = require('../../db/db');

// const MAX_FREE_PLAYLISTS = 4;

// exports.getByUser = async (req, res) => {
//   const playlists = await playlistsService.getByUserId(req.params.userId);
//   res.json(playlists);
// };

// exports.getById = async (req, res) => {
//   const playlist = await playlistsService.getById(req.params.id);
//   if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
//   playlist.songs = await songsService.getByPlaylist(playlist.id);
//   res.json(playlist);
// };


// exports.getByMood = async (req, res) => {
//   const mood = req.params.mood.trim().toLowerCase();
//   try {
//     const playlists = await playlistsService.getByMood(mood);

//     if (playlists.length === 0)
//       return res.status(404).json({ error: "לא נמצא פלייליסט עבור הרגש הזה" });

//     const playlist = playlists[0]; 

//     const songs = await songsService.getByPlaylist(playlist.id);
//     playlist.songs = songs;

//     res.json(playlist);
//   } catch (err) {
//     console.error("❌ שגיאה בקבלת פלייליסט לפי מצב רוח:", err);
//     res.status(500).json({ error: "שגיאה בשרת", details: err.message });
//   }
// };

// exports.votePlaylist = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { vote } = req.body;
//     const userId = req.user.id;

//     if (vote !== "like" && vote !== "dislike")
//       return res.status(400).json({ error: "Invalid vote" });

//     const prevVote = await playlistsService.getUserVote(userId, id);

//     if (!prevVote) {
//       await playlistsService.insertVote(userId, id, vote);
//     } else if (prevVote === vote) {
//       const playlistVotes = await playlistsService.getPlaylistVotes(id);
//       return res.json(playlistVotes);
//     } else {
//       await playlistsService.updateVote(userId, id, vote, prevVote);
//     }

//     const playlistVotes = await playlistsService.getPlaylistVotes(id);
//     res.json(playlistVotes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "DB error" });
//   }
// };
// exports.savePlaylistForUser = async (req, res) => {
//   const userId = req.user.id;
//   const playlistId = req.params.playlistId;
//   try {
//     const exists = await playlistsService.userHasPlaylist(userId, playlistId);
//     if (exists) return res.status(200).json({ message: "כבר שמור" });

//     await playlistsService.assignPlaylistToUser(userId, playlistId);
//     res.status(201).json({ message: "נשמר בהצלחה" });
//   } catch (err) {
//     res.status(500).json({ error: "שגיאה בשמירת הפלייליסט" });
//   }
// };
// const usersService = require('../service/usersService');

// // בדיקת הרשאת פרו
// function isPro(user) {
//   return user.role === "pro" || user.role === "admin";
// }

// exports.addSongToPlaylist = async (req, res) => {
//   if (!isPro(req.user)) {
//     return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
//   }
//   const { playlistId } = req.params;
//   const { title, url } = req.body;
//   if (!title || !url) return res.status(400).json({ error: "חובה למלא שם שיר וקישור" });
//   try {
//     await songsService.addSong({ playlist_id: playlistId, title, url });
//     const songs = await songsService.getByPlaylist(playlistId);
//     res.json({ success: true, songs });
//   } catch (err) {
//     res.status(500).json({ error: "שגיאה בהוספת שיר" });
//   }
// };

// exports.deleteSongFromPlaylist = async (req, res) => {
//   if (!isPro(req.user)) {
//     return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
//   }
//   const { playlistId, songId } = req.params;
//   try {
//     await songsService.deleteSong(songId, playlistId);
//     const songs = await songsService.getByPlaylist(playlistId);
//     res.json({ success: true, songs });
//   } catch (err) {
//     res.status(500).json({ error: "שגיאה במחיקת שיר" });
//   }
// };


// exports.editSongInPlaylist = async (req, res) => {
//   if (!isPro(req.user)) {
//     return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
//   }
//   const { playlistId, songId } = req.params;
//   const { title, url } = req.body;
//   try {
//     await songsService.editSong({ id: songId, playlist_id: playlistId, title, url });
//     const songs = await songsService.getByPlaylist(playlistId);
//     res.json({ success: true, songs });
//   } catch (err) {
//     res.status(500).json({ error: "שגיאה בעריכת שיר" });
//   }
// };
// exports.editPlaylist = async (req, res) => {
//   if (!isPro(req.user)) {
//     return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
//   }
//   const { playlistId } = req.params;
//   const { name, description, mood } = req.body;
//   try {
//     await playlistsService.editPlaylist({ id: playlistId, name, description, mood });
//     const playlist = await playlistsService.getById(playlistId);
//     res.json({ success: true, playlist });
//   } catch (err) {
//     res.status(500).json({ error: "שגיאה בעריכת פלייליסט" });
//   }
// };
const playlistsService = require('../service/playlistsService');
const songsService = require('../service/songsService');
const pool = require('../../db/db');
const usersService = require('../service/usersService');

const MAX_FREE_PLAYLISTS = 4;

function isPro(user) {
  return user.role === "pro" || user.role === "admin";
}

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

exports.getByMood = async (req, res) => {
  const mood = req.params.mood.trim().toLowerCase();
  try {
    const playlists = await playlistsService.getByMood(mood);
    if (playlists.length === 0)
      return res.status(404).json({ error: "לא נמצא פלייליסט עבור הרגש הזה" });

    const playlist = playlists[0];
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
    const { id } = req.params;
    const { vote } = req.body;
    const userId = req.user.id;

    if (vote !== "like" && vote !== "dislike")
      return res.status(400).json({ error: "Invalid vote" });

    const prevVote = await playlistsService.getUserVote(userId, id);

    if (!prevVote) {
      await playlistsService.insertVote(userId, id, vote);
    } else if (prevVote === vote) {
      const playlistVotes = await playlistsService.getPlaylistVotes(id);
      return res.json(playlistVotes);
    } else {
      await playlistsService.updateVote(userId, id, vote, prevVote);
    }

    const playlistVotes = await playlistsService.getPlaylistVotes(id);
    res.json(playlistVotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
};

exports.savePlaylistForUser = async (req, res) => {
  const userId = req.user.id;
  const playlistId = req.params.playlistId;
  try {
    const exists = await playlistsService.userHasPlaylist(userId, playlistId);
    if (exists) return res.status(200).json({ message: "כבר שמור" });

    const currentCount = await playlistsService.countUserPlaylists(userId);
    if (!isPro(req.user) && currentCount >= MAX_FREE_PLAYLISTS) {
      return res.status(403).json({ error: "משתמשים חינמיים יכולים לשמור עד 4 פלייליסטים בלבד" });
    }

    await playlistsService.assignPlaylistToUser(userId, playlistId);
    res.status(201).json({ message: "נשמר בהצלחה" });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בשמירת הפלייליסט" });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  if (!isPro(req.user)) {
    return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
  }
  const { playlistId } = req.params;
  const { title, url } = req.body;
  if (!title || !url) return res.status(400).json({ error: "חובה למלא שם שיר וקישור" });
  try {
    await songsService.addSong({ playlist_id: playlistId, title, url });
    const songs = await songsService.getByPlaylist(playlistId);
    res.json({ success: true, songs });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בהוספת שיר" });
  }
};

exports.deleteSongFromPlaylist = async (req, res) => {
  if (!isPro(req.user)) {
    return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
  }
  const { playlistId, songId } = req.params;
  try {
    await songsService.deleteSong(songId, playlistId);
    const songs = await songsService.getByPlaylist(playlistId);
    res.json({ success: true, songs });
  } catch (err) {
    res.status(500).json({ error: "שגיאה במחיקת שיר" });
  }
};

exports.editSongInPlaylist = async (req, res) => {
  if (!isPro(req.user)) {
    return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
  }
  const { playlistId, songId } = req.params;
  const { title, url } = req.body;
  try {
    await songsService.editSong({ id: songId, playlist_id: playlistId, title, url });
    const songs = await songsService.getByPlaylist(playlistId);
    res.json({ success: true, songs });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בעריכת שיר" });
  }
};

exports.editPlaylist = async (req, res) => {
  if (!isPro(req.user)) {
    return res.status(403).json({ error: "גישה רק למשתמשי פרו" });
  }
  const { playlistId } = req.params;
  const { name, description, mood } = req.body;
  try {
    await playlistsService.editPlaylist({ id: playlistId, name, description, mood });
    const playlist = await playlistsService.getById(playlistId);
    res.json({ success: true, playlist });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בעריכת פלייליסט" });
  }
};