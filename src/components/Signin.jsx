import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignIn = async () => {
    // Clear any previous error messages
    setError("");

    // Email validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation (ensure it's not empty)
    if (password.trim() === "") {
      setError("Password cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      navigate("/homepage"); // Redirect after successful login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className={styles.signIn}>
      <img className={styles.icon} alt="" src="05 1.png" />
      <div className={styles.signInChild} />
      <div className={styles.signInItem} />
      <div className={styles.signInInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.connectifyParent}>
        <b className={styles.connectify}>Connectify!</b>
        <div className={styles.anAllInOneSolution}>
          An all-in-one solution for your academic and club activity needs
        </div>
        <div className={styles.newUserCreateContainer}>
          <span className={styles.newUser}>New user?</span>
          <button onClick={() => navigate("/signup")}>
            <span className={styles.createANew}>Create a new account</span>
          </button>
        </div>
        <div className={styles.formLogIn}>
          <div className={styles.inputField}>
            <label className={styles.initials}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              placeholder="john@gnu.ac.in"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.initials}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Display validation error messages */}
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleSignIn}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
