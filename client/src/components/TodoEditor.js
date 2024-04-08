// TodoEditor.js
import React from "react";
import styles from "../styles/TodoEditor.module.css";

const TodoEditor = ({ text, completed, updateMode, deleteToDo, updateTodoStatus, todoId }) => {
  const handleUpdateStatus = () => {
    // Allow updating the status only if it's not completed
    if (!completed) {
      updateTodoStatus(todoId, !completed);
    }
  };

  return (
    <div className={`${styles.mainToContainer} ${completed ? styles.completed : ''}`}>
      <div className={styles.todo}>
        <div className={styles.todoText}>{text}</div>
        <div className={styles.todoIcons}>
          {/* if note is completed remove updating feature */}
          {!completed && (
            <i
              className={styles.todoIcon}
              class="fa-regular fa-pen-to-square"
              onClick={updateMode}
            ></i>
          )}
          {/* if note is completed remove updatestatus feature */}
          {!completed && (
            <i
              className={`${styles.todoIcon}`}
              class="fa-regular fa-check-circle"
              onClick={handleUpdateStatus}
            ></i>
          )}
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
