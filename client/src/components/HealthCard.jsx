function HealthCard({ health }) {
  return (
    <div className="card">
      <h2>❤️ Health Monitoring</h2>

      <p>
        ❤️ <strong>Heart Rate:</strong> {health?.heartRate} BPM
      </p>

      <p>
        🩸 <strong>SpO₂:</strong> {health?.spo2}%
      </p>

      <p>
        🌡 <strong>Temperature:</strong> {health?.temperature} °C
      </p>

      <p>
        🟢 <strong>Status:</strong> {health?.status}
      </p>
    </div>
  );
}

export default HealthCard;