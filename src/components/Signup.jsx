import React, { useState } from "react";
import styles from "./Signinup.module.css"; // Ensure this is the correct path
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = async () => {
    // Clear previous error
    setError("");

    // Email validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation (e.g., at least 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
      });
      setMessage("User registered successfully. Please sign in.");
      navigate("/signin");
    } catch (err) {
      setMessage("Error registering user. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className={styles.signUp}>
      <img className={styles.icon} alt="" src="05 1.png" />
      <div className={styles.signUpChild} />
      <div className={styles.signUpItem} />
      <div className={styles.signUpInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.connectifyParent}>
        <b className={styles.connectify}>Connectify!</b>
        <div className={styles.anAllInOneSolution}>
          An all-in-one solution for your academic and club activity needs
        </div>
        <div className={styles.alreadyAUserContainer}>
          <span className={styles.alreadyAUser}>Already a user?</span>
          <span>{` `}</span>
          <span>
            <button onClick={() => navigate("/signin")}>
              <span className={styles.signIn}>Sign In</span>
            </button>
          </span>
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
          {/* Show validation error message */}
          {error && <div className={styles.error}>{error}</div>}
          {/* Show success or failure message */}
          {message && <div className={styles.message}>{message}</div>}
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
