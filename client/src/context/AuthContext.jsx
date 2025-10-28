import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/users/me", { withCredentials: true });
        setUser(res.data.user);
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
      alert("Login error");
      return false;
    }
  };

  const googleLogin = async (token) => {
    try {
      const res = await api.post(
        "/auth/google",
        { token },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return true;
    } catch (err) {
      alert("Google Sign In Failed");
      return false;
    }
  };

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
      else alert("Registration error");
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
    } catch (e) {
      console.error("Logout error", e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, googleLogin, register, logout, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}