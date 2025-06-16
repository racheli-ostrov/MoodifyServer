import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Upgrade() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = async (plan) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/paypal/create", { plan });
      window.location.href = res.data.approvalUrl;
    } catch (err) {
      alert("שגיאה ביצירת תשלום: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    { label: "Pro חודשי", price: 8, term: "חודש" },
    { label: "Pro שנתי", price: 80, term: "שנה", recommended: true },
    { label: "Pro דו-שנתי", price: 140, term: "שנתיים" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🚀 שדרוג ל־Pro</h1>
        <p className="text-gray-600 mb-10">הצטרפו עכשיו לחוויית פרימיום עם כל ההטבות שלנו</p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.term}
              className={`relative rounded-2xl shadow-md border border-gray-200 bg-white p-6 flex flex-col justify-between transition hover:shadow-xl ${plan.recommended ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow">מומלץ</div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">{plan.label}</h2>
                <p className="text-4xl font-extrabold text-center text-gray-900 mb-1">${plan.price}</p>
                <p className="text-center text-sm text-gray-500">ל{plan.term}</p>
              </div>
              <button
                disabled={loading}
                onClick={() => handleUpgrade(plan.term)}
                className="mt-6 bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
              >
                שדרג עכשיו
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-right max-w-xl mx-auto">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">הטבות Pro כוללות:</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>🎧 גישה לפלייליסטים בלעדיים לפי מצב רוח</li>
            <li>⚡ ניתוח תמונה מהיר יותר</li>
            <li>🧠 המלצות מותאמות אישית</li>
            <li>📁 שמירת היסטוריה ללא הגבלה</li>
            <li>💬 תמיכה מקצועית ואישית</li>
          </ul>
        </div>
      </div>
    </div>
  );
}