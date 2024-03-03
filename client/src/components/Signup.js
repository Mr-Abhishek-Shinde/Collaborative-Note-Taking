import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import styles from "../styles/Signup.module.css";
import Swal from "sweetalert2";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isLoading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      Swal.fire({
        title: "Oops!",
        text: "Pleasae fill in all the details!",
        icon: "warning",
      });
    }

    await signup(name, username, email, password);
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["forms"]}>
        <div className={styles["form-content"]}>
          <div className={styles["login-form"]}>
            <div className={styles["title"]}>SignUp</div>
            <form >
              <div className={styles["inputBox"]}>
                {/* <label htmlFor="name">Name</label> */}
                <input
                  placeholder="Enter your Name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autocomplete="off"
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
                  autocomplete="off"
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
                  autocomplete="off"
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
                  autocomplete="off"
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
            {/* {error && <div className="error">{error}</div>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
