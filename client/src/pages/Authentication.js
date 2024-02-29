import { React, useState } from "react";
import styles from "../styles/Authentication.module.css";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { ToastContainer, toast } from 'react-toastify';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles["authentication-container"]}>
        <div className={styles["image-container"]}>
          <img src={imgAuth} alt="notfound" />
        </div>
        <div className={styles["page-container"]}>
          <button className={styles["login-button"]} onClick={() => setIsLogin(true)}>Login</button>
          
          <button className={styles["signup-button"]} onClick={() => setIsLogin(false)}>Signup</button>
        </div>  
        <div className={styles["main-box"]}>
          {isLogin ? <Login /> : <Signup />}
        </div>
      <ToastContainer />
        
      
    </div>
  );
};

export default Authentication;