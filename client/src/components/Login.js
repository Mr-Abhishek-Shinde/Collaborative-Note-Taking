import React from "react";
import styles from "../styles/Login.module.css";
import loginimg from "../image/loginimg.png";

const Login = () => {
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
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className={styles["input-box"]}>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className={`${styles["button"]} ${styles["input-box"]}`}>
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
