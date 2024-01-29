import React, { useState } from 'react';
import styles from "../styles/Signup.module.css";
import Otp from "./Otpverify";

const Signup = () => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    // Display the OTP component when the form is submitted
    setIsOtpVisible(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>Signup</div>
        {!isOtpVisible ? (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              <button type="submit">Submit</button>
            </div>
          </form>
        ) : (
          <Otp />
        )}
      </div>
    </div>
  );
};

export default Signup;
