import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, password, email, name);
    if (success) navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>חדש?</h2>
      <input type="text" placeholder="שם משתמש" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input type="password" placeholder="סיסמה" value={password} onChange={e=>setPassword(e.target.value)} required />
      <input type="text" placeholder="שם מלא" value={name} onChange={e=>setName(e.target.value)} required />
      <input type="email" placeholder="מייל" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button type="submit">הרשם</button>
      
    <div style={{ marginTop: "1em" }}>
      כבר רשום? <Link to="/login">התחבר כאן</Link>
            </div>
        <GoogleLogin
          onSuccess={credentialResponse => {
            // כאן תטפלי בהתחברות עם גוגל
            console.log(credentialResponse);
          }}
          onError={() => {
            alert("שגיאת התחברות עם גוגל");
          }}
        />

    </form>
  );
}