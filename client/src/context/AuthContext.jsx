import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = async (username, password) => {
    try {
      const res = await api.post("/users/login", { username, password });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return true;
    } catch {
      alert("שגיאת התחברות");
      return false;
    }
  };

const googleLogin = async (token) => {
  try {
    const res = await api.post("/users/auth/google", { token });
    // const res = await api.post("/auth/google", { token });
    console.log("Google login response:", res.data);
    if (!res.data.user || !res.data.token) throw new Error("חסרים נתונים מהשרת");
    console.log("📥 תגובת השרת מגוגל:", res.data);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return true;
  } catch (err) {
  alert("Google login error", err.response?.data || err.message || err);
    alert("Google Sign In Failed");
    return false;
  }
};

  const register = async (username, password, email, name) => {
    try {
      await api.post("/users/register", { username, password, email, name });
      return await login(username, password);
    } catch (e) {
      if (e.response?.data?.error) alert(e.response.data.error);
      else alert("שגיאת הרשמה");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}