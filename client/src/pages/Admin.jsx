import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  if (!user || (user.role !== "admin" && user.role !== "pro"))
    return <div>אין לך הרשאה לעמוד זה.</div>;

  return (
    <div>
      <h2>ניהול משתמשים</h2>
      <table>
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>שם</th>
            <th>אימייל</th>
            <th>הרשאה</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}