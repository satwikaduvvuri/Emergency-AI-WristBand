function SOSButton({ sendSOS }) {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <button
        className="sos-btn"
        onClick={sendSOS}
        style={{
          background: "#e53935",
          color: "#fff",
          border: "none",
          padding: "15px 30px",
          fontSize: "18px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🚨 SEND SOS
      </button>
    </div>
  );
}

export default SOSButton;