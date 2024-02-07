import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import loginimg from "../image/loginimg.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect } from "react";
import { useLogin } from "../hooks/useLogin";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText]=useState("");
  const { login, error, isLoading } = useLogin();
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
    console.log(error);
    
    
  };

  

  
  return (
    <div className={styles["container"]}>
      <div className={styles["cover"]}>
        <div className={styles["front"]}>
          <img src={loginimg} alt="not found" />
        </div>
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
                  onClick={
                    handleLogin}
                  className="button input-box"
                  disabled={isLoading}
                >
                  Login
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Login;
