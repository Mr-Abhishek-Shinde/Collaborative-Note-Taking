import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Home.module.css';
// import img1 from '../image/homepage.png';
// import img1 from '../image/homepage2.png';
import img1 from '../image/homepage3.png';

const Home = () => {
  
  
  return (
    <div className={styles["main-container"]}>
      <div className={styles["home-container"]}>
        <div className={styles["centered-container"]}> 
          <h1 className={styles["title"]}>Elevate Team Collaboration:<br></br>Unite Notes, Ignite Ideas</h1>
          {/* <p>Elevate Teamwork: where notes unite and ideas ignite</p> */}
          
          <Link to="/authentication">
            <button>Get Started</button>
          </Link>
          
        </div>
        <img src={img1} alt="notfound" className={styles["img"]}/>
        
      </div>
    </div>
  );
};

export default Home;
