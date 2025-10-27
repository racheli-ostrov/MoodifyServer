// const playlistsService = require('../service/playlistsService');
// const songsService = require('../service/songsService');

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
//       return res.status(404).json({ error: "No playlist found for this mood" });
//     const playlist = playlists[0];
//     const songs = await songsService.getByPlaylist(playlist.id);
//     playlist.songs = songs;
//     res.json(playlist);
//   } catch (err) {
//     console.error("❌ Error getting playlist by mood:", err);
//     res.status(500).json({ error: "Server error", details: err.message });
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
//     if (exists) return res.status(200).json({ message: "already saved" });
//     const currentCount = await playlistsService.countUserPlaylists(userId);
//     const isProUser = req.user.role === "pro";
//     if (!isProUser && currentCount >= MAX_FREE_PLAYLISTS) {
//       return res.status(403).json({ error: "Free users can only save up to 4 playlists" });
//     }
//     await playlistsService.assignPlaylistToUser(userId, playlistId);
//     res.status(201).json({ message: "Saved successfully" });
//   } catch (e) {
//     console.error("Save playlist error:", e);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.addSongToPlaylist = async (req, res) => {
//   const { playlistId } = req.params;
//   const { title, url } = req.body;
//   if (!title || !url) return res.status(400).json({ error: "Must fill in song name and link" });
//   try {
//     await songsService.addSong({ playlist_id: playlistId, title, url });
//     const songs = await songsService.getByPlaylist(playlistId);
//     res.json({ success: true, songs });
//   } catch (err) {
//     res.status(500).json({ error: "Error adding song" });
//   }
// };

// exports.deleteSongFromPlaylist = async (req, res) => {
//   const { playlistId, songId } = req.params;
//   try {
//     await songsService.deleteSong(songId, playlistId);
//     const songs = await songsService.getByPlaylist(playlistId);
//     res.json({ success: true, songs });
//   } catch (err) {
//     res.status(500).json({ error: "Error deleting song" });
//   }
// };

// exports.editSongInPlaylist = async (req, res) => {
//   const { playlistId, songId } = req.params;
//   const { title, url } = req.body;
//   try {
//     await songsService.editSong({ id: songId, playlist_id: playlistId, title, url });
//     const songs = await songsService.getByPlaylist(playlistId);
//     res.json({ success: true, songs });
//   } catch (err) {
//     res.status(500).json({ error: "Error editing song" });
//   }
// };

// exports.editPlaylist = async (req, res) => {
//   const { playlistId } = req.params;
//   const { name, description, mood } = req.body;
//   try {
//     await playlistsService.editPlaylist({ id: playlistId, name, description, mood });
//     const playlist = await playlistsService.getById(playlistId);
//     res.json({ success: true, playlist });
//   } catch (err) {
//     res.status(500).json({ error: "Error editing playlist" });
//   }
// };
import * as playlistsService from "../service/playlistsService.js";
import * as songsService from "../service/songsService.js";

const MAX_FREE_PLAYLISTS = 4;

export async function getByUser(req, res) {
  const playlists = await playlistsService.getByUserId(req.params.userId);
  res.json(playlists);
}

export async function getById(req, res) {
  const playlist = await playlistsService.getById(req.params.id);
  if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
  playlist.songs = await songsService.getByPlaylist(playlist.id);
  res.json(playlist);
}

export async function getByMood(req, res) {
  const mood = req.params.mood.trim().toLowerCase();
  try {
    const playlists = await playlistsService.getByMood(mood);
    if (playlists.length === 0)
      return res.status(404).json({ error: "No playlist found for this mood" });

    const playlist = playlists[0];
    const songs = await songsService.getByPlaylist(playlist.id);
    playlist.songs = songs;

    res.json(playlist);
  } catch (err) {
    console.error("❌ Error getting playlist by mood:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}

export async function votePlaylist(req, res) {
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
}

export async function savePlaylistForUser(req, res) {
  const userId = req.user.id;
  const playlistId = req.params.playlistId;

  try {
    const exists = await playlistsService.userHasPlaylist(userId, playlistId);
    if (exists) return res.status(200).json({ message: "already saved" });

    const currentCount = await playlistsService.countUserPlaylists(userId);
    const isProUser = req.user.role === "pro";

    if (!isProUser && currentCount >= MAX_FREE_PLAYLISTS) {
      return res.status(403).json({ error: "Free users can only save up to 4 playlists" });
    }

    await playlistsService.assignPlaylistToUser(userId, playlistId);
    res.status(201).json({ message: "Saved successfully" });
  } catch (e) {
    console.error("Save playlist error:", e);
    res.status(500).json({ error: "Server error" });
  }
}

export async function addSongToPlaylist(req, res) {
  const { playlistId } = req.params;
  const { title, url } = req.body;

  if (!title || !url)
    return res.status(400).json({ error: "Must fill in song name and link" });

  try {
    await songsService.addSong({ playlist_id: playlistId, title, url });
    const songs = await songsService.getByPlaylist(playlistId);
    res.json({ success: true, songs });
  } catch (err) {
    res.status(500).json({ error: "Error adding song" });
  }
}

export async function deleteSongFromPlaylist(req, res) {
  const { playlistId, songId } = req.params;
  try {
    await songsService.deleteSong(songId, playlistId);
    const songs = await songsService.getByPlaylist(playlistId);
    res.json({ success: true, songs });
  } catch (err) {
    res.status(500).json({ error: "Error deleting song" });
  }
}

export async function editSongInPlaylist(req, res) {
  const { playlistId, songId } = req.params;
  const { title, url } = req.body;
  try {
    await songsService.editSong({ id: songId, playlist_id: playlistId, title, url });
    const songs = await songsService.getByPlaylist(playlistId);
    res.json({ success: true, songs });
  } catch (err) {
    res.status(500).json({ error: "Error editing song" });
  }
}

export async function editPlaylist(req, res) {
  const { playlistId } = req.params;
  const { name, description, mood } = req.body;
  try {
    await playlistsService.editPlaylist({ id: playlistId, name, description, mood });
    const playlist = await playlistsService.getById(playlistId);
    res.json({ success: true, playlist });
  } catch (err) {
    res.status(500).json({ error: "Error editing playlist" });
  }
}

export default {
  getByUser,
  getById,
  getByMood,
  votePlaylist,
  savePlaylistForUser,
  addSongToPlaylist,
  deleteSongFromPlaylist,
  editSongInPlaylist,
  editPlaylist,
};