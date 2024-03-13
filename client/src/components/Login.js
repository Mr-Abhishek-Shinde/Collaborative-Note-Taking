import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import Swal from "sweetalert2";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [text, setText]=useState("");
  const { login, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill in all the details!",
        icon: "warning",
      });
    }

    await login(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>Login</h1>
        <form action="#">
          <div className={styles.inputBoxes}>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autocomplete="off"
              />
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autocomplete="off"
              />
            </div>
            <button
              onClick={handleLogin}
              className={styles.btn}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
