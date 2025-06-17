import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpgradeCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    // אופציונלי: חזרה אוטומטית לדף הבית אחרי כמה שניות
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>❌ Payment Canceled</h1>
      <p style={styles.message}>
        Your Pro upgrade has been canceled. No changes were made to your account.
      </p>
      <button style={styles.button} onClick={() => navigate("/upgrade")}>
        Try Again
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "4em auto",
    textAlign: "center",
    background: "#fff",
    padding: "2em",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#d93025",
  },
  message: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "2rem",
  },
  button: {
    padding: "0.8em 1.5em",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};