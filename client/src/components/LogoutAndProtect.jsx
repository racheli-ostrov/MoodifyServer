// ✅ קובץ: Home.jsx (או כל מקום שיש בו כפתור Log Out)
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("שגיאה בלוגאאוט", err);
    }

    setUser(null);
    navigate("/login");
   };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}