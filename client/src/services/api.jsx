import axios from "axios";

const api = axios.create({
  baseURL: "https://moodifyserver.onrender.com/api", // כתובת השרת שלך
  withCredentials: true, // חובה בשביל cookies / session
});

export default api;
