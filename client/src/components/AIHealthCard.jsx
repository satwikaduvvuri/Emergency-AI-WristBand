import { useState } from "react";
import axios from "axios";

function AIHealthCard({ health }) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/ai", {
        heartRate: health.heartRate,
        spo2: health.spo2,
        temperature: health.temperature,
      });

      setAdvice(res.data.advice);
    } catch (error) {
      alert("AI Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🤖 AI Health Assistant</h2>

      <button className="ai-btn" onClick={askAI}>
        ✨ Ask AI
      </button>

      <br />
      <br />

      {loading ? (
        <p>Analyzing your health...</p>
      ) : (
        <p style={{ whiteSpace: "pre-wrap" }}>
          {advice || "Click 'Ask AI' to get health advice."}
        </p>
      )}
    </div>
  );
}

export default AIHealthCard;