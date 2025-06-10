import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/home");;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>משתמש קיים</h2>
      <input
        type="text"
        placeholder="שם משתמש או מייל"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
<div style={{ marginTop: "1em" }}>
  עדיין לא רשום? <Link to="/register">הרשם כאן</Link>
</div>
      <button type="submit">התחבר</button>
      <div style={{margin:"1em 0"}}><GoogleLoginButton /></div>

    </form>
  );
}