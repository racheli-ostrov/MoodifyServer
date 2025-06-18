import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    // בדיקת התחברות אוטומטית בטעינה
useEffect(() => {
  async function fetchUser() {
    try {
      const res = await api.get("/users/me", { withCredentials: true });
      setUser(res.data.user); // שים לב! ייתכן שצריך res.data.user ולא res.data
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  fetchUser();
}, []);
  const login = async (username, password) => {
    try {
      const res = await api.post(
        "/users/login",
        { username, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return true;
    } catch {
      alert("שגיאת התחברות");
      return false;
    }
  };

  // ✅ התחברות דרך Google OAuth
  const googleLogin = async (token) => {
    try {
      const res = await api.post(
        "/users/auth/google",
        { token },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return true;
    } catch (err) {
      alert("Google login error", err.response?.data || err.message || err);
      alert("Google Sign In Failed");
      return false;
    }
  };

  // ✅ הרשמה ואז התחברות אוטומטית
  const register = async (username, password, email, name) => {
    try {
      await api.post("/users/register", {
        username,
        password,
        email,
        name,
      });
      return await login(username, password);
    } catch (e) {
      if (e.response?.data?.error) alert(e.response.data.error);
      else alert("שגיאת הרשמה");
      return false;
    }
  };

  // ✅ התנתקות מהשרת ומנקה את ה־state
  const logout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
    } catch (e) {
      console.error("שגיאה בלוגאאוט", e);
    }
    setUser(null);
    // navigate("/login");
  };
  // if (loading) return <div>טוען...</div>;
  return (
    <AuthContext.Provider
      value={{ user, login, googleLogin, register, logout, setUser, loading  }}
    >
      {children}
    </AuthContext.Provider>
  );
}