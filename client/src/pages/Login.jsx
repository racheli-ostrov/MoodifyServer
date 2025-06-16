import LoginForm from "../components/LoginForm";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { user } = useContext(AuthContext); // ✅ כאן זה מותר
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home", { replace: true });
  }, [user]);

  return (
    <from>
    <div>
      <LoginForm />
    </div>
    </from>
  );
}