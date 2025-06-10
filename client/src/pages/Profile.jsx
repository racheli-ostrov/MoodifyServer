import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  if (!user) return <p>לא מחובר.</p>;
  return (
    <div>
      <h2>הפרופיל שלי</h2>
      <p><b>שם משתמש:</b> {user.username}</p>
      <p><b>שם:</b> {user.name}</p>
      <p><b>אימייל:</b> {user.email}</p>
      <p><b>הרשאה:</b> {user.role}</p>
    </div>
  );
}