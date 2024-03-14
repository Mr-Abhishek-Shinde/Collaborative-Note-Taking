import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openNav = () => {
    setIsSidebarOpen(true);
  };

  const closeNav = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className={styles.main}>
        <div
          id="mainSideNav"
          className={`${styles.sidenav} ${isSidebarOpen ? styles.open : ""}`}
        >
          {/* eslint-disable-next-line */}
          <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>
            &times;
          </a>
          <Link to="/">About</Link>
          <Link to="/">Services</Link>
          <Link to="/">Clients</Link>
          <Link to="/">Contact</Link>
        </div>
        <span id={styles.lines} onClick={openNav}>
          &#9776;
        </span>
        <ul className={styles.cards}>
          <li className={styles.cards_item}>
            <div className={styles.card}>
              <div className={styles.card_img}>
                <img src="" alt="" />
              </div>
              <div className={styles.card_content}>
                <h2 className={styles.card_title}>Notes</h2>
                <p className={styles.card_text}>
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <button className={styles.btn}>Read More</button>
              </div>
            </div>
          </li>
          <li className={styles.cards_item}>
            <div className={styles.card}>
              <div className={styles.card_img}>
                <img src="" alt="" />
              </div>
              <div className={styles.card_content}>
                <h2 className={styles.card_title}>To-do List</h2>
                <p className={styles.card_text}>
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <button className={styles.btn}>Read More</button>
              </div>
            </div>
          </li>
          <li className={styles.cards_item}>
            <div className={styles.card}>
              <div className={styles.card_img}>
                <img src="" alt="" />
              </div>
              <div className={styles.card_content}>
                <h2 className={styles.card_title}>Mind-Map</h2>
                <p className={styles.card_text}>
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <button className={styles.btn}>Read More</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
