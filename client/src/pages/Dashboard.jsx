import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState({});
  const [health, setHealth] = useState({});
  const [contacts, setContacts] = useState([]);
  const [sosHistory, setSOSHistory] = useState([]);

  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    relation: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchHealth();
    fetchContacts();
    fetchSOSHistory();
  }, []);

  // Get User Profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Health Data
  const fetchHealth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/health");
      setHealth(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Contacts
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/contact",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get SOS History
  const fetchSOSHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/sos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSOSHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Input Change
  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Contact
  const addContact = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/contact",
        contactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Contact Added Successfully");

      setContactData({
        name: "",
        phone: "",
        relation: "",
      });

      fetchContacts();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add contact");
    }
  };

  // Send SOS
  const sendSOS = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/sos",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchSOSHistory();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to Send SOS");
    }
  };

  return (
    <div className="dashboard">
      <h1 className="title">🚑 Emergency AI Wrist Band</h1>

      <div className="cards">
        <div className="card">
          <h2>👤 User Details</h2>

          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        <div className="card">
          <h2>❤️ Health Monitoring</h2>

          <p>❤️ Heart Rate: {health.heartRate} BPM</p>
          <p>🩸 SpO₂: {health.spo2}%</p>
          <p>🌡 Temperature: {health.temperature} °C</p>
          <p>🟢 Status: {health.status}</p>
        </div>
      </div>

      <div className="card">
        <h2>📞 Emergency Contacts</h2>

        <input
          type="text"
          name="name"
          placeholder="Contact Name"
          value={contactData.name}
          onChange={handleContactChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={contactData.phone}
          onChange={handleContactChange}
        />

        <br /><br />

        <input
          type="text"
          name="relation"
          placeholder="Relation"
          value={contactData.relation}
          onChange={handleContactChange}
        />

        <br /><br />

        <button onClick={addContact}>➕ Add Contact</button>

        <hr />

        {contacts.length === 0 ? (
          <p>No Contacts Added</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id}>
              <h4>{contact.name}</h4>
              <p>{contact.phone}</p>
              <p>{contact.relation}</p>
              <hr />
            </div>
          ))
        )}
      </div>

      <button className="sos-btn" onClick={sendSOS}>
        🚨 SEND SOS
      </button>

      <div className="card">
        <h2>📜 SOS History</h2>

        {sosHistory.length === 0 ? (
          <p>No SOS History</p>
        ) : (
          sosHistory.map((item) => (
            <div key={item._id}>
              <p><strong>{item.message}</strong></p>
              <p>Status: {item.status}</p>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;