import React from "react";
import styles from "../styles/Dashboard.module.css";
import { Link } from 'react-router-dom';
import imgTodo from '../image/todolist.jpg';
const Dashboard = () => {
  return (
    <div className={styles.dashBoardBg}>
      <ul className={styles.cards}>
        <li className={styles.cards_item}>
          <Link to="/notes" className={styles.card_link}>
            <div className={styles.card}>
              <div className={styles.card_img}>
                <img src={imgTodo} alt="not found" />
              </div>
              <div className={styles.card_content}>
                <h2 className={styles.card_title}>Notes</h2>
                <p className={styles.card_text}>
                  Demo of pixel perfect pure CSS simple responsive card grid layout
                </p>
                {/* <h4>Click to create new note</h4> */}
                <button className={styles.btn}>Read More</button>
              </div>
            </div>
          </Link>
        </li>

        <li className={styles.cards_item}>
          <Link to="/notes" className={styles.card_link}>
              <div className={styles.card}>
                <div className={styles.card_img}>
                  <img src={imgTodo} alt="not found" />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>To-do List</h2>
                  <p className={styles.card_text}>
                    Demo of pixel perfect pure CSS simple responsive card grid
                    layout
                  </p>
                  {/* <h4>Click to create new note</h4> */}
                  <button className={styles.btn}>Read More</button>
                </div>
              </div>
          </Link>
        </li>
        
        <li className={styles.cards_item}>
          <Link to="/notes" className={styles.card_link}>
            <div className={styles.card}>
              <div className={styles.card_img}>
                <img src={imgTodo} alt="not found" />
              </div>
              <div className={styles.card_content}>
                <h2 className={styles.card_title}>Mind-Map</h2>
                <p className={styles.card_text}>
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                {/* <h4>Click to create new note</h4> */}
                <button className={styles.btn}>Read More</button>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
