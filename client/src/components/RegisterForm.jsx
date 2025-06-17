import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, password, email, name);
    if (success) navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>הרשמה</h2>

      <input
        type="text"
        placeholder="שם משתמש"
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
      <input
        type="text"
        placeholder="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">הרשם</button>

      <div style={{ marginTop: "1em" }}>
        כבר רשום? <Link to="/login">התחבר כאן</Link>
      </div>

      <hr />

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log("🎫 credentialResponse:", credentialResponse);
          console.log("🧪 credential:", credentialResponse.credential);
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