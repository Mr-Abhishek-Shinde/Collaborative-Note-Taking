import React from "react";
import styles from "../styles/Dashboard.module.css";
import { Link } from 'react-router-dom';
import imgTodos from '../image/todolist.jpg';
import imgNotes from '../image/notes.png';

const Dashboard = () => {
  return (
    <div className={styles.dashBoardBg}>
      <ul className={styles.cards}>
        <li className={styles.cards_item}>
          <Link to="/notes" className={styles.card_link}>
            <div className={styles.card}>
              <div className={styles.card_img}>
                <img src={imgNotes} alt="not found" />
              </div>
              <div className={styles.card_content}>
                <h2 className={styles.card_title}>Notes</h2>
                <p className={styles.card_text}>
                Keep in mind to regularly dedicate time to your notes!
                </p>
                <button className={styles.btn}>Read More</button>
              </div>
            </div>
          </Link>
        </li>

        <li className={styles.cards_item}>
          <Link to="/todo" className={styles.card_link}>
              <div className={styles.card}>
                <div className={styles.card_img}>
                  <img src={imgTodos} alt="not found" />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>To-do List</h2>
                  <p className={styles.card_text}>
                    Avoid procrastination. Ensure you complete your to-do list tasks!
                  </p>
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
