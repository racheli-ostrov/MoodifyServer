import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleLoginButton() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, password, email, name);
    if (success) navigate("/home", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "1em" }}>
        <GoogleLogin
          onSuccess={async credentialResponse => {
            const token = credentialResponse.credential;
            const success = await googleLogin(token);
            if (success) navigate("/home", { replace: true });
          }}
          onError={() => {
            alert("שגיאת התחברות עם גוגל");
          }}
        />
      </div>
    </form>
  );
}