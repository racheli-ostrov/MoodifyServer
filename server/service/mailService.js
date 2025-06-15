const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // אפשר גם שירות אחר
  auth: {
    user: process.env.EMAIL_USER, // הוסף ל-.env
    pass: process.env.EMAIL_PASS, // הוסף ל-.env
  },
});

// exports.sendWelcomeMail = async (to, username) => {
//   await transporter.sendMail({
//     from: `"Moodify" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "ברוכים הבאים ל-Moodify!",
//     html: `
//       <h2>שלום ${username},</h2>
//       <p>ברוך הבא לאתר שלנו!<br>
//       שם המשתמש שלך: <b>${username}</b><br>
//       אנו מאחלים לך חוויה מהנה!</p>
//     `,
//   });
// };