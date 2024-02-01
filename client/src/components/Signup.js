import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import styles from "../styles/Signup.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(name, username, email, password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>Signup</div>
            <form>
              <div className={styles.inputBox}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                onClick={handleSignup}
                className={styles.button}
                disabled={isLoading}
              >
                Sign Up
              </button>
            </form>
            {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Signup;
