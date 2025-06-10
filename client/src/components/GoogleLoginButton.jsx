import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;



    const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, password, email, name);
    if (success) navigate("/");
  };

//   export default function RegisterForm() {
//     const { googleLogin } = useContext(AuthContext);
//   const navigate = useNavigate();
// }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "1em" }}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            alert("שגיאת התחברות עם גוגל");
          }}
        />
      </div>
    </form>
  );
}