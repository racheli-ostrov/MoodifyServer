import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

export default function UpgradeSuccess() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get("plan") || "Pro";
  const timestamp = new Date().toLocaleString("he-IL", {
    dateStyle: "short",
    timeStyle: "short"
  });

  useEffect(() => {
    const confirmUpgrade = async () => {
      try {
        await api.post("/users/upgrade", {}, { withCredentials: true });
        const updatedUser = { ...user, role: "pro" };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error("Error upgrading user", err);
      }
    };

    if (user?.role !== "pro") {
      confirmUpgrade();
    }

    const timeout = setTimeout(() => {
      navigate("/profile");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [navigate, user, setUser]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-lg text-center animate-fade-in">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">🎉 ברוך הבא ל־SoundMate {plan}!</h1>
        <p className="text-gray-700 text-lg mb-2">
          {user?.name ? `שלום ${user.name},` : "השדרוג שלך בוצע בהצלחה!"}
        </p>
        <p className="text-gray-700 text-lg mb-4">
          אתה כעת משתמש <span className="font-bold text-purple-600">{plan}</span> עם כל ההטבות הפעילות.
        </p>
        <div className="flex items-center justify-center gap-4 mb-6">
          {user?.image && (
            <img
              src={user.image}
              alt="avatar"
              className="w-16 h-16 rounded-full border-2 border-purple-500"
            />
          )}
          <div className="text-left">
            <p className="font-semibold">{user?.username}</p>
            <p className="text-sm text-gray-500">סטטוס: {plan} ✅</p>
            <p className="text-sm text-gray-500">שודרג בתאריך: {timestamp}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">מעבירים אותך לפרופיל בעוד מספר שניות...</p>
        <button
          onClick={() => navigate("/profile")}
          className="mt-6 bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
        >
          עבור לפרופיל עכשיו
        </button>
      </div>
    </div>
  );
}