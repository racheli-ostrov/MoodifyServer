import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../Upgrade/Upgrade.moudle.css";

export default function Upgrade() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpgrade = async (plan) => {
    try {
      setLoading(true);
      const res = await api.post("/paypal/create", { plan });
      window.location.href = res.data.approvalUrl;
    } catch (err) {
      alert("Error creating payment: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    { label: "Pro Monthly", price: 8, term: "month", gradient: "from-purple-500 to-pink-500" },
    { label: "Pro Yearly", price: 80, term: "year", gradient: "from-green-500 to-emerald-500" },
    { label: "Pro 2 Years", price: 140, term: "Two years", gradient: "from-blue-500 to-cyan-500" },
  ];

   if (!user || !user.username) {
    return (
      <div className="error-message">
        אין אפשרות לראות את עמוד הפרו ללא התחברות כמשתמש.
      </div>
    );
  }

  return (
    <div className="upgrade-container">
      <div className="upgrade-container">
        <h1>🚀 Upgrade to Pro</h1>
        <p>Join now for a premium experience with all the following benefits:</p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.term} className="plan-card">
            <div className="plan-title">{plan.label}</div>
            <div className="plan-price">${plan.price}</div>
            <div className="plan-term">per {plan.term}</div>
            <button
              disabled={loading}
              onClick={() => handleUpgrade(plan.term)}
              className="upgrade-button"
            >
              Upgrade Now
            </button>
          </div>
        ))}
      </div>

      <div className="features-list">
        <h3>Pro Benefits Include:</h3>
        <ul>
          <li>🎧 Access to exclusive playlists by mood</li>
          <li>⚡ Faster image analysis</li>
          <li>🧠 Personalized recommendations</li>
          <li>📁 Unlimited history saving</li>
          <li>💬 Professional and personal support</li>
        </ul>
      </div>
    </div>
  );
}