import { React, useState } from "react";
import styles from "../styles/Authentication.module.css";
import Login from "../components/Login";
import Signup from "../components/Signup";
import imgAuth from '../image/authBG.png'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authenticationContainer}>
        <div className={styles.imageContainer}>
          <img src={imgAuth} alt="" />
        </div>
        <div className={styles.pageContainer}>
          <button className={styles.loginButton} onClick={() => setIsLogin(true)}>Login</button>
          
          <button className={styles.signupButton} onClick={() => setIsLogin(false)}>Signup</button>
        </div>  
        <div className={styles.mainBox}>
          {isLogin ? <Login /> : <Signup />}
        </div>
        
      
    </div>
  );
};

export default Authentication;