import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpgradeCancel() {
  const navigate = useNavigate();

  useEffect(() => {
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