import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from "../styles/Dashboard.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const createBlankNote = () => {
    axios
      .post("http://localhost:4000/api/note/createNote", {
        title: "Untitled",
        content: {
          "ops": [
            {
              "insert": "Start Typing...\n"
            }
          ]
        },
        username: user.username,
      })
      .then((response) => {
        navigate(`/notes/${response.data.noteId}`);
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
  };

  return (
    <>
      <ul className={styles.cards}>
        <li className={styles.cards_item} onClick={createBlankNote}>
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
              <h4>Click to create new note</h4>
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
    </>
  );
};

export default Dashboard;
