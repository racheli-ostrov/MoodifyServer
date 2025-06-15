-- יצירת בסיס הנתונים
CREATE DATABASE IF NOT EXISTS soundmate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE soundmate;

-- טבלת משתמשים
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE,
  name VARCHAR(100),
  role ENUM('user','pro','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- טבלת תמונות
CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  mood VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- טבלת פלייליסטים
CREATE TABLE playlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image_id INT,
  mood VARCHAR(50) NOT NULL,
  name VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  likes INT DEFAULT 0,
  disLikes INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (image_id) REFERENCES images(id)
);

-- טבלת שירים
CREATE TABLE songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  playlist_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255),
  FOREIGN KEY (playlist_id) REFERENCES playlists(id)
);

-- טבלת הצבעות לפלייליסטים
CREATE TABLE playlist_votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  playlist_id INT NOT NULL,
  vote ENUM('like','dislike') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (playlist_id) REFERENCES playlists(id)
);

-- הכנסת נתונים לטבלת users
INSERT INTO users (id, username, password, email, name, role, created_at) VALUES
(1,'admin','$2b$10$zS2SRVNHVwHE98.8gwBM5OB0vaL82tLQGmJPjP0Hdq961C/N9f8o5u','admin@soundmate.com','Admin Admin','admin','2025-06-08 22:22:09'),
(2,'proUser','$2b$10$u8dR0kWaZg5h6kefCpq7e9E982g8Ef/Y0wRBL8OvA83KpqOdrVJa','pro@soundmate.com','Pro User','pro','2025-06-08 22:22:09'),
(3,'reguLarUser','$2b$10$fwxFoR8Fv/dxE5hj9uUM7y/JGa6nLfuL8WoFHyKFLFayF5Q2','user@soundmate.com','Regular User','user','2025-06-08 22:22:09'),
(4,'mytestuser','$2b$10$XXXXXXXXXXXXXX','testmail@mail.com','Test User','user','2025-06-08 22:22:09'),
(5,'akaaa','$2b$10$jkT4jdnmE0h4U5hLGuMKMw9pV/LyjiVVXX2e6','s0583329785@gmail.com','aaaa','user','2025-06-10 11:32:41'),
(6,'deart','$2b$10$irRcjA20lnl6HqE0SGqEdarTkohfTPP/TV/.g4o6ra9e','gt@gmail.com','wergthy','user','2025-06-10 10:45:47'),
(7,'defg','$2b$10$..vVk.RnUt0c6tHLtEUP5dV1bGKnheSGrnRGGqJhfOmYu.1i2','defr@gmail.com','dfgg','user','2025-06-10 20:46:32'),
(9,'shulamit','$2b$10$jaYKPbutPybZJLzt.DqJ.R3QjNYv59aQ.sFPCwAy2JXtHtJra','s854@gmail.com','shulamit','user','2025-06-10 20:46:32'),
(10,'kih','$2b$10$wDAHnA0jcUjTUz6b.zxsTdhadDJvUmPthLhXc9dCd6L','bikn@gmail.com','bikn','user','2025-06-11 17:19:59'),
(11,'rfgh','$2b$10$cIXuTgeWk3x7fiJWRipuwo1v/e/5bH27hYdVXfXa/mgIYg7Wd','df@gmail.com','sdff','user','2025-06-10 20:50:50'),
(12,'sara','$2b$10$wC4uMQTQvH4jBYbXO2lZ0PbrYz3Q8KwIF0PtZYcP5twaI','my05326741@gmail.com','sdff','user','2025-06-11 20:10:49'),
(13,'gege','$2b$10$wC4uMQTQvH4jBYbXO2lZ0PbrYz3Q8KwIF0PtZYcP5twaI','sara@gmail.com','gege hege ostrov','user','2025-06-11 20:10:49'),
(14,'chooshon','$2b$10$afr/HB6e4vYGRCSyPYRE0LkNq8iE9ueFByjb2xrAOFJW7aA','shoshi@gmail.com','shoshi','user','2025-06-15 00:21:51'),
(15,'wer','$2b$10$HrayCYSFtUOUwqpsdPNhJvV5EeD9da6bQ1/puGi','er@gmail.com','sertg','user','2025-06-15 00:21:51'),
(16,'oma','$2b$10$BPKLphjWfSdRZioAhsVfZ7pyFxr6Id.eNefNQaAapyH','racheli2005@gmail.com','oma','user','2025-06-15 01:22:43'),
(17,'Jxñn','$2b$10$PTJnhiIGqo.Smm3bor.Z/6UqePOGptF6KNwrs8DMHqAe','navas@gmail.com','Jxñn','user','2025-06-15 01:22:43'),
(18,'ssdfgrg','$2b$10$trqRAwljw6BpxyCzV1NoGUG3H5vjtP3itCZ.i','efrgt@gmail.com','efrgt','user','2025-06-15 02:04:35'),
(19,'tgbvuh','$2b$10$uFzfoqzRNz6jYixcuhLA0b4vFwmKtNlz7kBytIGc9Zw7vMBEtQC','rachel.yostrov@gmail.com','vbyhujnmk','user','2025-06-15 02:04:35'),
(23,'sdfgtgy','$2b$10$6kEz6MgeJxCkN5HR7BUu9.prk7mQ-fzHkysqgG.QsjwhsYQOQNG','rachfcvtybujnmkleylostrov@gmail.com','rctvbyujnimk','user','2025-06-15 02:05:45');

-- הכנסת נתונים לטבלת images
INSERT INTO images (id, user_id, url, mood, created_at) VALUES
(1,1,'https://example.com/pic_admin.jpg','calm','2025-06-08 22:22:09'),
(2,2,'https://example.com/pic_pro.jpg','calm','2025-06-08 22:22:09'),
(3,3,'https://example.com/pic_user.jpg','joy','2025-06-08 22:22:09'),
(4,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749740324/fcncqobuaaamwglo4yt.jpg','sad','2025-06-12 17:58:50'),
(5,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749740559/ornl0lmsrof5wke7nlco.jpg','happy','2025-06-12 18:02:45'),
(6,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749740641/yaopu2rlbfudoyrych7.jpg','neutral','2025-06-12 18:04:07'),
(7,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749741514/o4hnq7fjkUobd6tL4gbo.jpg','sad','2025-06-12 18:18:39'),
(8,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749741913/caktbas4uuezzzd8kfki.jpg','happy','2025-06-12 18:25:19'),
(9,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749742067/iiplvmxzevywazqvmz75.jpg','sad','2025-06-12 18:27:58'),
(10,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749742203/pj2t1b5fwqrkp2g8a87u.jpg','sad','2025-06-12 18:30:11'),
(11,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749742553/s3meg6dbmbakc7n286kl.jpg','sad','2025-06-12 18:36:00'),
(12,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749744251/e6lxqdctpr6qtk1lgywe.jpg','happy','2025-06-12 19:04:21'),
(13,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749744357/kcmrhuwqffvwpjxtiiwa.jpg','happy','2025-06-12 19:06:05'),
(14,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749744544/qjgfg8fqmc1vj7g7jdump.jpg','happy','2025-06-12 19:24:20'),
(15,15,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749746057/lgwcrkemvfqfqdcysbq8.jpg','sad','2025-06-12 19:34:24'),
(16,12,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749748272/saetl2blvjjo2uxxoful.jpg','happy','2025-06-15 00:15:26'),
(17,16,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749753502/xb4kqm50ucj6pj6d9mv.jpg','fear','2025-06-15 00:15:56'),
(18,17,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749753717/nymmpetgqsndjcvyzuq.jpg','happy','2025-06-15 00:15:26'),
(19,17,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749756387/boqumcd1jmrmgn8dfxj.jpg','neutral','2025-06-15 00:26:40'),
(20,17,'https://res.cloudinary.com/dypp3nm8u/image/upload/v1749756387/boqumcd1jmrmgn8dfxj.jpg','neutral','2025-06-15 00:26:40');

-- הכנסת נתונים לטבלת playlists
INSERT INTO playlists (id, user_id, image_id, mood, name, description, created_at, likes, disLikes) VALUES
(1,1,1,'happy','Admin Happy Playlist','פלייליסט שמח של אדמין','2025-06-08 22:22:09',2,0),
(2,1,1,'surprise','ProUser Chill','רפאל עונג מסיליליפין','2025-06-08 22:22:09',0,0),
(3,3,3,'sad','User Sad Songs','ליגריל בובע מסיליליפין','2025-06-08 22:22:09',0,1),
(4,1,NULL,'calm','מיינד נודר',NULL,'2025-06-09 23:49:01',0,0),
(5,1,NULL,'energetic','ניצבפוק דינע',NULL,'2025-06-09 23:49:01',0,0),
(6,1,NULL,'romantic','הנשמת נרועמ קרד',NULL,'2025-06-09 23:49:01',0,0),
(7,1,NULL,'neutral','שונמר תמדר',NULL,'2025-06-09 23:49:01',0,1),
(8,1,NULL,'fear','נרוטסמ נרוטסמ',NULL,'2025-06-09 23:49:01',1,0);

-- הכנסת נתונים לטבלת songs (כל השירים מהתמונה)
INSERT INTO songs (id, playlist_id, title, url) VALUES
(1,1,'Happy Song','https://www.youtube.com/watch?v=yf_GZ17kM0H'),
(2,1,'Smiles','https://www.youtube.com/watch?v=6imG2C_BIiE'),
(3,1,'Relaxation','https://www.youtube.com/watch?v=GnrUEO0FSAI'),
(4,1,'Blue Mood','https://www.youtube.com/watch?v=8hM_gIEf6qs'),
(5,1,'Rainy Mood','https://www.youtube.com/watch?v=BGtM1Lea_Os&pp=8gcJCdgAoTvqNStD'),
(6,1,'Relaxing Guitar','https://www.youtube.com/watch?v=0k3Zoe1dZhY'),
(7,1,'Meditation Music','https://www.youtube.com/watch?v=7AuBIMXZfXA'),
(8,1,'Ocean Sounds','https://www.youtube.com/watch?v=AVp8UVD1Pf8'),
(9,1,'Soft Piano','https://www.youtube.com/watch?v=f2Fb1fN4s6s'),
(10,1,'Morning Coffee','https://www.youtube.com/watch?v=K8CsnHcQe0s&pp=8gcJCdgAoTvqNStD'),
(11,1,'Sunrise Ambience','https://www.youtube.com/watch?v=K8CsnHcQe0s&pp=8gcJCdgAoTvqNStD'),
(12,1,'Tranquility','https://www.youtube.com/watch?v=ePM0xyC7i4c'),
(13,2,'Happy Upbeat','https://www.youtube.com/watch?v=KfX0vC3qwA4'),
(14,2,'Good Mood','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(15,2,'Sunny Day','https://www.youtube.com/watch?v=L8OhX1eL6wE&pp=8gcJCdgAoTvqNStD'),
(16,2,'Smile Song','https://www.youtube.com/watch?v=4l6ZkN4nV0k'),
(17,2,'Bright Side','https://www.youtube.com/watch?v=7kNnY8AV'),
(18,2,'La Vida Loca','https://www.youtube.com/watch?v=lgA-FHD4XBQ&pp=ygUICFzLnRS'),
(19,2,'Energetic Pop','https://www.youtube.com/watch?v=Kj6HhdfEGpp&pp=8gcJCdgAoTvqNStD'),
(20,2,'Joy Ride','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(21,3,'Thinking Time','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(22,3,'Deep Focus','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(23,3,'Cinematic Piano','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(24,3,'RelaxNoBy Walk','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(25,3,'Slow Reflections','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(26,3,'Late Night Thoughts','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(27,3,'Abstract Sound','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(28,4,'Sad Story','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(29,4,'Epic Score','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(30,4,'Sad Violin','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(31,4,'Intense Drama','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(32,4,'Battle Cry','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(33,4,'Emotional Piano','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(34,4,'Tension Rise','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(35,4,'Final Scene','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(36,4,'Orchestra Storm','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(37,4,'Rock Madness','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(38,4,'Dance Floor','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(39,4,'Crazy Beat','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(40,4,'Wild Party','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(41,4,'Hype It Up','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(42,4,'Bounce It','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(43,4,'Pump It','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(44,4,'Ocean Out','https://www.youtube.com/watch?v=RsKiplpW5uQ'),
(45,4,'Fear Song 1','https://www.youtube.com/watch?v=XLsoNdsjO1Q'),
(46,4,'Fear Song 2','https://www.youtube.com/watch?v=C3Cj8sucz4I'),
(47,4,'Fear Song 3','https://www.youtube.com/watch?v=F3rkl42q1qs'),
(48,4,'Fear Song 4','https://www.youtube.com/watch?v=_j6Oa8W2dXg'),
(49,4,'Fear Song 5','https://www.youtube.com/watch?v=LC8iJ8mJHds'),
(50,4,'Fear Song 6','https://www.youtube.com/watch?v=CJbkl1tQnxg&pp=8gcJCdgAoTvqNStD'),
(51,4,'Fear Song 7','https://www.youtube.com/watch?v=QbTQYk1Nyns'),
(52,4,'Fear Song 8','https://www.youtube.com/watch?v=a0u3cYSPFcY'),
(53,4,'Fear Song 9','https://www.youtube.com/watch?v=9kHLtWR4Pk9&pp=8gcJCdgAoTvqNStD'),
(54,4,'Fear Song 10','https://www.youtube.com/watch?v=obJueStnckg&pp=8gcJCdgAoTvqNStD'),
(55,4,'natural Song 1','https://www.youtube.com/watch?v=2BRAR0MCWcM'),
(56,4,'natural Song 2','https://www.youtube.com/watch?v=20bMRr4p6bI'),
(57,4,'natural Song 3','https://www.youtube.com/watch?v=IzseakHfbgE'),
(58,4,'natural Song 4','https://www.youtube.com/watch?v=Lj8aBV2NdYg'),
(59,4,'natural Song 5','https://www.youtube.com/watch?v=RkAhanUWVfY'),
(60,4,'natural Song 6','https://www.youtube.com/watch?v=geRy3bfs5V5'),
(61,4,'natural Song 7','https://www.youtube.com/watch?v=CKzSK3g-rq4'),
(62,4,'natural Song 8','https://www.youtube.com/watch?v=UDEo_X7Kf4w'),
(63,4,'natural Song 9','https://www.youtube.com/watch?v=JWRaW7rFqg'),
(64,4,'natural Song 10','https://www.youtube.com/watch?v=ZDR3ROMCWdM'),
(65,4,'natural Song 11','https://www.youtube.com/watch?v=CrrIUoE57AM'),
(66,4,'natural Song 12','https://www.youtube.com/watch?v=ZDR3ROMCWdM');

-- הכנסת נתונים לטבלת playlist_votes
INSERT INTO playlist_votes (id, user_id, playlist_id, vote) VALUES
(1,1,3,'like'),
(2,15,3,'like'),
(3,1,7,'like'),
(4,15,7,'dislike'),
(5,1,8,'like'),
(6,12,7,'dislike');