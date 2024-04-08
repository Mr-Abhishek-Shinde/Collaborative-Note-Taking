import React, { useState } from "react";
import styles from "../styles/TodoEditor.module.css";

const TodoEditor = ({ text, updateMode, deleteToDo }) => {
  return (
    <div className={styles.mainToContainer}>
      <div className={styles.todo}>
        <div className={styles.todoText}>{text}</div>
        <div className={styles.todoIcons}>
          <i
            className={styles.todoIcon}
            class="fa-regular fa-pen-to-square"
            onClick={updateMode}
          ></i>
          <i
            className={styles.todoIcon}
            class="fa-regular fa-trash-can"
            onClick={deleteToDo}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default TodoEditor;
