import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/home");
  };

  return (
  <div className="login-page">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Login</h2>

      <input
        className="form-input"
        type="text"
        placeholder="Username or Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="form-button" type="submit">Login</button>

      <div className="form-link">
        Not registered yet? <Link to="/register">Sign up</Link>
      </div>

      <div className="google-login-section">
        <hr className="form-divider" />
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const token = credentialResponse.credential;
            console.log("🟢 Google Token:", token);

            const success = await googleLogin(token,{ withCredentials: true });
            if (success) navigate("/home");
          }}
          onError={() => {
            alert("Google login failed");
          }}
        />
      </div>
    </form>
  </div>
); 
}