import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaMusic, FaImages, FaListUl, FaUser } from "react-icons/fa";

export default function Sidebar() {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("user"); // מחיקת הפרטים מה־localStorage
   setUser(null);                  // איפוס ה־context
  navigate("/login");              // מעבר לדף התחברות
};

  return (
    <nav className="side-navbar large-buttons">
      <Link to="/home" className="logo" style={{ textDecoration: "none", color: "inherit" }}>
        📸 MOODIFY
      </Link>
      <button onClick={() => navigate("/playlists")}>
        <FaListUl />
        <div>
          <span className="stat-number">1,245</span><br />
          Playlists
        </div>
      </button>
      <button onClick={() => navigate("/photos")}>
        <FaImages />
        <div>
          <span className="stat-number">7,532</span><br />
          Photos
        </div>
      </button>
      <button onClick={() => navigate("/songs")}>
        <FaMusic />
        <div>
          <span className="stat-number">14,097</span><br />
          Songs
        </div>
      </button>
      <button onClick={() => navigate("/upgrade")}>
        <FaUser />
        <div>
          <span className="stat-number">293</span><br />
          Pro users
        </div>
      </button>
      <button onClick={handleLogout}>Log Out</button>
    </nav>
  );
}