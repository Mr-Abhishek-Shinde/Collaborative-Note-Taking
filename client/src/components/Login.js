import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import loginimg from "../image/loginimg.png";

import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        {/* <div className={styles["image"]}>
          <img src={loginimg} alt="not found" />
        </div> */}
      </div>
      <div className={styles["forms"]}>
        <div className={styles["form-content"]}>
          <div className={styles["login-form"]}>
            <div className={styles["title"]}>Login</div>
            <form action="#">
              <div className={styles["input-boxes"]}>
                <div className={styles["input-box"]}>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles["input-box"]}>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  onClick={handleLogin}
                  className={styles["button-input-box"]}
                  disabled={isLoading}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
