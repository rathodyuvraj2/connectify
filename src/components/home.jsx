// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user", {
          withCredentials: true, // Include cookies with the request if needed
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error("Error fetching user data:", err);
        navigate("/signin"); // Redirect to sign-in if there's an issue
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      navigate("/signin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className={styles.homePage}>
      <h1 className={styles.welcome}>Welcome, {username}!</h1>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
