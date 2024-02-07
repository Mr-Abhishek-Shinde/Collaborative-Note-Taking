import { React, useState } from "react";
import styles from "../styles/Authentication.module.css";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { ToastContainer, toast } from 'react-toastify';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles["authentication-container"]}>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        
        <button onClick={() => setIsLogin(false)}>Signup</button>
      </div>

      <div>
        {isLogin ? <Login /> : <Signup />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Authentication;