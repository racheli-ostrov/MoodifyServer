import LoginForm from "../components/LoginForm";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
