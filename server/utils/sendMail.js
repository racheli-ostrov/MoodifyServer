const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendWelcomeEmail = async (email, name) => {
  await transporter.sendMail({
from: '"SoundMate" <no-reply@soundmate.com>',
to: email,
subject: "🎵 Welcome to SoundMate – Your Mood, Your Music!",
html: `
  <div style="font-family:Arial,sans-serif; background-color:#f9f9f9; padding:30px; border-radius:10px; max-width:600px; margin:auto; border:1px solid #ddd;">
    <div style="text-align:center;">
      <img src="https://i.imgur.com/WP1UQ9j.png" alt="SoundMate Logo" style="width:100px; margin-bottom:20px;" />
      <h1 style="color:#444;">Hi ${name} 👋</h1>
    </div>
    <p style="font-size:16px; color:#333;">
      Thanks for joining <strong>SoundMate</strong> 🎶 – where your feelings choose your music.
    </p>
    <p style="font-size:16px; color:#333;">
      We've created a personalized experience just for you. Explore playlists based on your mood and discover music that matches how you feel.
    </p>
    <div style="text-align:center; margin:30px 0;">
      <a href="http://localhost:5173/login" style="background-color:#6a5acd; color:#fff; text-decoration:none; padding:12px 24px; border-radius:30px; font-weight:bold; font-size:16px;">
        Go to My Account
      </a>
    </div>
    <p style="font-size:14px; color:#888; text-align:center;">
      Happy listening!<br/>
      – The SoundMate Team 💜
    </p>
  </div>
`
  });
};