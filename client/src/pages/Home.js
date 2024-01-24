import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles["home-container"]}>
      <h1>Welcome</h1>
      <Link to="/authentication">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
