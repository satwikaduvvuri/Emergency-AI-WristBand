import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import HealthCard from "../components/HealthCard";
import LocationCard from "../components/LocationCard";
import ContactCard from "../components/ContactCard";
import SOSButton from "../components/SOSButton";
import SOSHistory from "../components/SOSHistory";
import AIHealthCard from "../components/AIHealthCard";

function Dashboard() {
  const [user, setUser] = useState({});
  const [health, setHealth] = useState({});
  const [contacts, setContacts] = useState([]);
  const [sosHistory, setSOSHistory] = useState([]);

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

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
    getLocation();
  }, []);

  // ---------------- USER ----------------

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
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- HEALTH ----------------

  const fetchHealth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/health"
      );

      setHealth(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- CONTACTS ----------------

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

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

      alert("✅ Contact Added");

      setContactData({
        name: "",
        phone: "",
        relation: "",
      });

      fetchContacts();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };
    // ---------------- SOS ----------------

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
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send SOS");
    }
  };

  // ---------------- LOCATION ----------------

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // ---------------- UI ----------------

  return (
    <div className="dashboard">

      <Navbar />

      <div className="cards">

        <UserCard user={user} />

        <HealthCard health={health} />
        <AIHealthCard health={health} />

        <LocationCard location={location} />

      </div>

      <ContactCard
        contacts={contacts}
        contactData={contactData}
        handleContactChange={handleContactChange}
        addContact={addContact}
      />

      <SOSButton sendSOS={sendSOS} />

      <SOSHistory sosHistory={sosHistory} />

    </div>
  );
}

export default Dashboard;