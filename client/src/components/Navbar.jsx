// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav>
//       <Link to="/">SoundMate</Link>
//       {user ? (
//         <>
//           <Link to="/playlists">הפלייליסטים שלי</Link>
//           <Link to="/profile">הפרופיל שלי</Link>
//           {user.role === "admin" || user.role === "pro" ? (
//             <Link to="/admin">ניהול</Link>
//           ) : null}
//           <button onClick={logout}>התנתקות</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">התחברות</Link>
//           <Link to="/register">הרשמה</Link>
//         </>
//       )}
//     </nav>
//   );
// }