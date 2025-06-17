// import { useState, useContext } from "react";
// import UploadImage from "../../components/UploadImage/UploadImage";
// import PlaylistDetails from "../../components/playlists/PlaylistDetails";
// import "../Home/Home.moudle.css";
// import { useNavigate } from "react-router-dom";
// import { FaMusic, FaImages, FaListUl, FaUser } from "react-icons/fa";
// import { AuthContext } from "../../context/AuthContext";
// import api from "../../services/api";

// export default function Home() {
//   const { setUser } = useContext(AuthContext);
//   const { user } = useContext(AuthContext);
//   const [playlist, setPlaylist] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.post("/users/logout", {}, { withCredentials: true });
//     } catch (err) {
//       console.error("שגיאה בלוגאאוט", err);
//     }

//     setUser(null);
//     navigate("/login", { replace: true });

//     // חוסם חזרה עם BACK
//     window.history.pushState(null, "", window.location.href);
//     window.onpopstate = () => {
//       navigate("/login", { replace: true });
//     };
//   };

//   return (
//     <div className="page-container no-scroll">
//       <nav className="side-navbar large-buttons">
//         <h1 className="logo">📸 MOODIFY</h1>

//         {user && (
//           <div
//             className={`user-status-badge ${user.role === "pro" ? "pro" : "free"}`}
//             onClick={() => {
//               if (user.role !== "pro") window.location.href = "/upgrade";
//             }}
//             title={user.role === "pro" ? "You are a Pro user" : "Click to upgrade"}
//           >
//             {user.role === "pro" ? "Pro 🌟" : "Free User"}
//           </div>
//         )}

//         <button onClick={() => navigate("/playlists")}>
//           <FaListUl />
//           <div>
//             <span className="stat-number">1,245</span><br />
//             Playlists
//           </div>
//         </button>
//         <button onClick={() => navigate("/photos")}>
//           <FaImages />
//           <div>
//             <span className="stat-number">7,532</span><br />
//             Photos
//           </div>
//         </button>
//         <button onClick={() => navigate("/songs")}>
//           <FaMusic />
//           <div>
//             <span className="stat-number">14,097</span><br />
//             Songs
//           </div>
//         </button>
//         <button onClick={() => navigate("/upgrade")}>
//           <FaUser />
//           <div>
//             <span className="stat-number">293</span><br />
//             Pro users
//           </div>
//         </button>

//         <button onClick={handleLogout}>Log Out</button>
//       </nav>

//       <main className="main-content colorful-bg">
//         <div className="centered-content">
//           {user && (
//             <h1>
//               Hello, {user.name ? user.name : user.username}!
//             </h1>
//           )}
//           <h1 className="main-title">?How are you feeling today</h1>
//           <p className="subtitle">Upload a photo and we'll create a playlist that matches your mood.</p>
//           <div className="upload-card">
//             <UploadImage onPlaylistCreated={setPlaylist} />
//           </div>
//           {playlist && <PlaylistDetails playlist={playlist} />}
//         </div>
//       </main>
//     </div>
//   );
// }
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaImages, FaListUl, FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import UploadImage from "../../components/UploadImage/UploadImage";
import PlaylistDetails from "../../components/playlists/PlaylistDetails";
import "./Home.moudle.css";
import api from "../../services/api";

export default function Home() {
  const { user, logout, loading } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();

//  useEffect(() => {
//     const handleBack = (e) => {
//       e.preventDefault();
//       window.history.pushState(null, "", window.location.href);
//     };

//     // רק אם יש עמוד אחד בהיסטוריה (למשל אחרי התחברות)
//     if (window.history.length <= 2) {
//       window.history.pushState(null, "", window.location.href);
//       window.addEventListener("popstate", handleBack);
//     }

//     return () => window.removeEventListener("popstate", handleBack);
//   }, []);


  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("שגיאה בלוגאאוט", err);
    }

    logout();
    navigate("/login");
  };

if (loading) {
  return <div className="error-message">טוען...</div>;
}
if (!user || !user.username) {
  return (
    <div className="error-message">
      אין אפשרות לראות את עמוד הבית ללא התחברות כמשתמש.
    </div>
  );
}

  return (
    <div className="page-container no-scroll">
      <nav className="side-navbar large-buttons">
        <h1 className="logo">📸 MOODIFY</h1>
        {user && (
          <div
            className={`user-status-badge ${user.role === "pro" ? "pro" : "free"}`}
            onClick={() => {
              if (user.role !== "pro") navigate("/upgrade");
            }}
            title={user.role === "pro" ? "You are a Pro user" : "Click to upgrade"}
            style={{ cursor: user.role !== "pro" ? "pointer" : "default" }}
          >
            {user.role === "pro" ? "Pro 🌟" : "Free User"}
          </div>
        )}

        <button onClick={() => navigate("/playlists")}>
          <FaListUl />
          <div>
            <span className="stat-number">1,245</span>
            <br />
            Playlists
          </div>
        </button>
        <button onClick={() => navigate("/photos")}>
          <FaImages />
          <div>
            <span className="stat-number">7,532</span>
            <br />
            Photos
          </div>
        </button>
        <button onClick={() => navigate("/upgrade")}>
          <FaUser />
          <div>
            <span className="stat-number">293</span>
            <br />
            Pro users
          </div>
        </button>
        <button onClick={handleLogout}>Log Out</button>
      </nav>

      <main className="main-content colorful-bg">
        <div className="centered-content">
          {user && (
            <h1>
              Hello, {user.name ? user.name : user.username}!
            </h1>
          )}
          <h1 className="main-title">?How are you feeling today</h1>
          <p className="subtitle">
            Upload a photo and we'll create a playlist that matches your mood.
          </p>
          <div className="upload-card">
            <UploadImage onPlaylistCreated={setPlaylist} />
          </div>
          {playlist && <PlaylistDetails playlist={playlist} />}
        </div>
      </main>
    </div>
  );
}
