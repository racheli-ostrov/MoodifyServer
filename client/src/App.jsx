import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "../src/pages/Home";
import Playlists from "./pages/Playlists";
import NotFound from "./pages/NotFound";
import Photos from "./pages/Photos";
import Sidebar from "./components/Sidebar";
import Upgrade from "../src/pages/Upgrade/Upgrade";
import UpgradeSuccess from "../src/pages/Upgrade/UpgradeSuccess";
import UpgradeCancel from "../src/pages/Upgrade/UpgradeCanceled";

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

console.log("✅ GOOGLE CLIENT ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function App() {
  const { user, loading } = useContext(AuthContext);

const RequireAuth = ({ children }) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3em' }}>⌛ ...loading user</div>;
  }
  return user ? children : <Navigate to="/login" />;
};


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <RequireAuth>
                <MainLayout>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/photos" element={<Photos />} />
                    <Route path="/upgrade" element={<Upgrade />} />
                    <Route path="/upgrade/success" element={<UpgradeSuccess />} />
                    <Route path="/upgrade/cancel" element={<UpgradeCancel />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}
