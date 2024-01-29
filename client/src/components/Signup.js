import React, { useState } from 'react';
import styles from "../styles/Signup.module.css";
import OtpVerify from "./OtpVerify";

const Signup = () => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation logic here

    setIsOtpVisible(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>Signup</div>
        {!isOtpVisible ? (
          <form onSubmit={handleSubmit}>
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
            <div className={styles.inputBox}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.button}>
              <button type="submit">Proceed</button>
            </div>
          </form>
        ) : (
          <OtpVerify />
        )}
      </div>
    </div>
  );
};

export default Signup;
