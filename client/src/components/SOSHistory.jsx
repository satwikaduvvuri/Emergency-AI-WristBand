function SOSHistory({ sosHistory }) {
  return (
    <div className="card">
      <h2>📜 SOS History</h2>

      {sosHistory.length === 0 ? (
        <p>No SOS History</p>
      ) : (
        sosHistory.map((item) => (
          <div key={item._id}>
            <p>
              <strong>{item.message}</strong>
            </p>

            <p>Status: {item.status}</p>

            <p>
              {new Date(item.createdAt).toLocaleString()}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default SOSHistory;