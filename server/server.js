require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const imagesRoutes = require('./routes/images');
const playlistsRoutes = require('./routes/playlists');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const path = require('path');
const paypalRoutes = require('./routes/payPal');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/playlists', playlistsRoutes);
app.use('/api/paypal', paypalRoutes);

app.get('/', (req, res) => res.send('SoundMate API'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
