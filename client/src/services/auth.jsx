import api from "./api";

const login = async (username, password) => {
  const res = await api.post("/users/login", { username, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
  }
  return null;
};

const register = async (username, password, email, name) => {
  await api.post("/users/register", { username, password, email, name });
  // הרשמה מוצלחת, ננסה להתחבר מייד
  return await login(username, password);
};

const googleLogin = async (token) => {
  const res = await api.post("/auth/google", { token });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
  }
  return null;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

export async function getByMood(mood) {
  const res = await api.get(`/playlists/bymood/${mood}`);
  return res.data;
}

export default {
  login,
  register,
  googleLogin,
  logout,
  getCurrentUser,
};
