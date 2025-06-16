// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const usersRoutes = require('./routes/users');
// const imagesRoutes = require('./routes/images');
// const playlistsRoutes = require('./routes/playlists');
// const authRoutes = require('./routes/auth');
// const uploadRoutes = require('./routes/upload');
// const path = require('path');
// const paypalRoutes = require('./routes/payPal');
// const cookieParser = require('cookie-parser');

// const app = express();
// // app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// app.use(express.json());
// app.use('/api/upload', uploadRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/auth', authRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/images', imagesRoutes);
// app.use('/api/playlists', playlistsRoutes);
// app.use('/api/paypal', paypalRoutes);
// app.use(cookieParser());

// app.get('/', (req, res) => res.send('SoundMate API'));
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const usersRoutes = require('./routes/users');
const imagesRoutes = require('./routes/images');
const playlistsRoutes = require('./routes/playlists');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const paypalRoutes = require('./routes/payPal');

const app = express();

// ✅ הגדרת CORS עם תמיכה ב־cookies
app.use(cors({
  origin: 'http://localhost:5173', // או כתובת ה-Frontend שלך
  credentials: true
}));

app.use(express.json());

// ✅ חשוב! צריך להיות לפני הראוטים כדי לקרוא את ה-cookie
app.use(cookieParser());

// 📁 קבצי upload סטטיים
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ ראוטים
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/playlists', playlistsRoutes);
app.use('/api/paypal', paypalRoutes);

// ✅ ברירת מחדל
app.get('/', (req, res) => res.send('SoundMate API'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));