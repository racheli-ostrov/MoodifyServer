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

    // חסימת BACK/FORWARD
     window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/login",);
    };
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}


// ✅ קובץ: Login.jsx (אותו דבר גם ב־Register.jsx)
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <form>
      {/* טופס התחברות כאן */}
    </form>
  );
}