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
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>התחברות</h2>

      <input
        type="text"
        placeholder="שם משתמש או אימייל"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">התחבר</button>

      <div style={{ marginTop: "1em" }}>
        עדיין לא רשום? <Link to="/register">הרשמה</Link>
      </div>

      <hr />

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential;
          const success = await googleLogin(token);
          if (success) navigate("/home");
        }}
        onError={() => {
          alert("שגיאת התחברות עם גוגל");
        }}
      />
    </form>
  );
}