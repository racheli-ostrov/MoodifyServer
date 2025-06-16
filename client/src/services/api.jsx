import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true, // חשוב מאוד כדי שה־cookie יישלח אוטומטית
});

// אין צורך ב־interceptor לקריאת token מה־localStorage

export default api;