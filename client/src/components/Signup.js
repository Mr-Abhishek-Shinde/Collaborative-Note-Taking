import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import styles from "../styles/Signup.module.css";
import { toast } from "react-toastify";
import {useEffect } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(name, username, email, password);
    if(!error){
      toast.success("Signing up")
    }
  };

  return (
    <div className={styles["main-container"]}>
      {/* <div className={styles["image-container"]}>
          <img src={loginimg} alt="not found" />
      </div> */}
      <div className={styles["forms"]}>
        <div className={styles["form-content"]}>
          <div className={styles["login-form"]}>
            <div className={styles["title"]}>SignUp</div>
            <form>
              <div className={styles["inputBox"]}>
                {/* <label htmlFor="name">Name</label> */}
                <input
                  placeholder="Enter your Name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles["inputBox"]}>
                {/* <label htmlFor="username">Username</label> */}
                <input
                  placeholder="Enter the Username"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles["inputBox"]}>
                {/* <label htmlFor="email">Email</label> */}
                <input
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles["inputBox"]}>
                {/* <label htmlFor="password">Password</label> */}
                <input
                  placeholder="Enter the Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                onClick={handleSignup}
                className={styles["button-input-box"]}
                disabled={isLoading}
              >
                Sign Up
              </button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Signup;
