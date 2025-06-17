import RegisterForm from "../components/RegisterForm";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  //    window.history.pushState(null, "", window.location.href);
  //   window.onpopstate = () => {
  //   window.history.pushState(null, "", window.location.href);
  // };
  }, [user]);

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
