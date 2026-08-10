import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSOS: 0,
  });

  const [users, setUsers] = useState([]);
  const [sos, setSOS] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, sosRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/stats"),
        axios.get("http://localhost:5000/api/admin/users"),
        axios.get("http://localhost:5000/api/admin/sos"),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setSOS(sosRes.data);
    } catch (error) {
      console.error("Admin Dashboard Error:", error);
      alert("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="admin-page">

      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>🛡️ Admin Dashboard</h1>
          <p>Emergency AI Wrist Band Management</p>
        </div>

        <button
          className="refresh-btn"
          onClick={fetchAdminData}
        >
          🔄 Refresh
        </button>
      </header>

      {/* Statistics */}
      <section className="stats-container">

        <div className="stat-card users-card">
          <div className="stat-icon">👥</div>
          <div>
            <h3>Total Users</h3>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="stat-card sos-card">
          <div className="stat-icon">🚨</div>
          <div>
            <h3>Total SOS Alerts</h3>
            <h2>{stats.totalSOS}</h2>
          </div>
        </div>

      </section>

      {/* Users */}
      <section className="admin-section">
        <div className="section-title">
          <h2>👥 Registered Users</h2>
          <span>{users.length} Users</span>
        </div>

        {users.length === 0 ? (
          <p className="empty-message">No users found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registered</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "Not provided"}</td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* SOS Alerts */}
      <section className="admin-section">
        <div className="section-title">
          <h2>🚨 SOS Alerts</h2>
          <span>{sos.length} Alerts</span>
        </div>

        {sos.length === 0 ? (
          <p className="empty-message">No SOS alerts found.</p>
        ) : (
          <div className="sos-list">

            {sos.map((item) => (
              <div className="sos-card" key={item._id}>

                <div className="sos-left">
                  <div className="sos-icon">🚨</div>

                  <div>
                    <h3>
                      {item.message || "Emergency SOS Triggered"}
                    </h3>

                    {item.user && (
                      <p>
                        👤 User: <b>{item.user.name}</b>
                      </p>
                    )}

                    {item.user?.email && (
                      <p>📧 {item.user.email}</p>
                    )}

                    {item.createdAt && (
                      <p>
                        🕒{" "}
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <span className="status-badge">
                  {item.status || "Sent"}
                </span>

              </div>
            ))}

          </div>
        )}
      </section>

    </div>
  );
}

export default AdminDashboard;