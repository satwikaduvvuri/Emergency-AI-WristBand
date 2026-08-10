import { useState } from "react";
import axios from "axios";

function AIHealthCard({ health }) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {
      setLoading(true);
      setAdvice("");

      const res = await axios.post("http://localhost:5000/api/ai", {
        heartRate: health?.heartRate,
        spo2: health?.spo2,
        temperature: health?.temperature,
      });

      setAdvice(res.data.advice);
    } catch (error) {
      console.error("AI Error:", error);
      setAdvice("Unable to get AI advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card ai-card">

      <div className="ai-title">
        <span className="ai-icon">🤖</span>
        <div>
          <h2>AI Health Assistant</h2>
          <p>AI-powered health analysis</p>
        </div>
      </div>

      <div className="ai-vitals">

        <div className="ai-vital">
          <span>❤️</span>
          <div>
            <small>Heart Rate</small>
            <strong>
              {health?.heartRate || "--"} BPM
            </strong>
          </div>
        </div>

        <div className="ai-vital">
          <span>🫁</span>
          <div>
            <small>SpO₂</small>
            <strong>
              {health?.spo2 || "--"}%
            </strong>
          </div>
        </div>

        <div className="ai-vital">
          <span>🌡️</span>
          <div>
            <small>Temperature</small>
            <strong>
              {health?.temperature || "--"} °C
            </strong>
          </div>
        </div>

      </div>

      <button
        className="ai-btn"
        onClick={askAI}
        disabled={loading}
      >
        {loading ? "🔄 Analyzing..." : "✨ Ask AI"}
      </button>

      {loading && (
        <div className="ai-loading">
          <div className="loader"></div>
          <p>Analyzing your health data...</p>
        </div>
      )}

      {!loading && advice && (
        <div className="ai-result">
          <div className="result-title">
            🤖 AI Health Analysis
          </div>

          <p>{advice}</p>
        </div>
      )}

      {!loading && !advice && (
        <p className="ai-placeholder">
          Click <strong>Ask AI</strong> to analyze your current health data.
        </p>
      )}

    </div>
  );
}

export default AIHealthCard;