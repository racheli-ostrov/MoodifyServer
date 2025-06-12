import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "../src/pages/Home/Home";
import Playlists from "./pages/Playlists";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Photos from "./pages/Photos";
// import Navbar from "./components/Navbar";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}