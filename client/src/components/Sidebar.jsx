import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaMusic, FaImages, FaListUl, FaUser } from "react-icons/fa";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="side-navbar large-buttons">
      <Link to="/home" className="logo logo-link" aria-label="Home">
        📸 MOODIFY
      </Link>

      {user && (
        <div
          className={`user-status-badge ${user.role === "pro" ? "pro" : "free"} ${user.role !== "pro" ? "status-upgrade" : ""}`}
          onClick={() => {
            if (user.role !== "pro") navigate("/upgrade");
          }}
          title={user.role === "pro" ? "You are a Pro user" : "Click to upgrade"}
        >
          {user.role === "pro" ? "Pro 🌟" : "Free User"}
        </div>
      )}

      <button onClick={() => navigate("/playlists")} aria-label="Go to playlists">
        <FaListUl />
        <div>
          <span className="stat-number">1,245</span><br />
          Playlists
        </div>
      </button>

      <button onClick={() => navigate("/photos")} aria-label="Go to photos">
        <FaImages />
        <div>
          <span className="stat-number">7,532</span><br />
          Photos
        </div>
      </button>

      <button onClick={() => navigate("/upgrade")} aria-label="Go to upgrade">
        <FaUser />
        <div>
          <span className="stat-number">293</span><br />
          Pro users
        </div>
      </button>

      <button className="sidebar-logout" onClick={handleLogout} aria-label="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-9a2 2 0 0 0-2 2v4h2V5h9v14h-9v-4h-2v4a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
        </svg>
        Log Out
      </button>
    </nav>
  );
}