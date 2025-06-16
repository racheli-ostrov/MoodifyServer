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
import Upgrade from "./pages/Upgrade";
import UpgradeSuccess from "./pages/UpgradeSuccess";
import Sidebar from "./components/Sidebar";


function MainLayout({ children }) {
  return (
    <div className="page-container no-scroll">
      <Sidebar />
      <main className="main-content colorful-bg">
        {children}
      </main>
    </div>
  );
}
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          {/* עמודי התחברות/הרשמה בלי סיידבר */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route
            path="*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/photos" element={<Photos />} />
                  <Route path="/upgrade" element={<Upgrade />} />
                  <Route path="/upgrade/success" element={<UpgradeSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}