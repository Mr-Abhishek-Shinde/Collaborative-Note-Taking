import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Home.module.css';
// import img1 from '../image/homepage.png';
// import img1 from '../image/homepage2.png';
import img1 from '../image/homepage3.png';

const Home = () => {
  
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.homeContainer}>
        <div className={styles.centeredContainer}> 
          <h1 className={styles.title}>Elevate Team Collaboration:<br></br>Unite Notes, Ignite Ideas</h1>
          <Link to="/authentication">
            <button>Get Started</button>
          </Link>
          
        </div>
        <img src={img1} alt="notfound" className={styles.img}/>
      </div>
    </div>
  );
};

export default Home;
