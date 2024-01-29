import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Home.module.css';
import img1 from '../image/main.png';

const Home = () => {
  return (
    
    <div className={styles["home-container"]}>
      <div className={styles["centered-container"]}> 
        
        <h1>Welcome</h1>
        <Link to="/authentication">
          <button>Get Started</button>
        </Link>
        {/* <img src={img1} alt="image" className={styles["img"]}/> */}
      </div>

    </div>
  );
};

export default Home;
