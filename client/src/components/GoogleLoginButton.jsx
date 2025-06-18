import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "1em" }}>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential;
          const success = await googleLogin(token);
          if (success) navigate("/home");
        }}
        onError={() => {
          alert("google login failed. Please try again.");
        }}
      />
    </div>
  );
}