import React, { useEffect, useState } from "react";
import styles from "../styles/TodoEditor.module.css";
import TodoEditor from "../components/TodoEditor";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import imgTodo from "../image/authBG.png";

const TodoBase = () => {
  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/todo/getTodos/${user.username}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  };

  // Function to sort todos by status
  const sortTodos = (todosToSort) => {
    return [...todosToSort].sort((a, b) => {
      if (a.status === "Completed" && b.status !== "Completed") {
        setIsLoading(false);
        return 1; // Move completed todos to the end
      } else if (a.status !== "Completed" && b.status === "Completed") {
        setIsLoading(false);
        return -1; // Move pending todos to the beginning
      } else {
        setIsLoading(false);
        return 0;
      }
    });
  };

  useEffect(() => {
    if (user) {
      fetchTodos().then((fetchedTodos) => {
        const sortedTodos = sortTodos(fetchedTodos);
        setTodos(sortedTodos);
      });
    }
    // eslint-disable-next-line
  }, [user]);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const createTodo = async (text) => {
    try {
      await axios.post(`http://localhost:4000/api/todo/createTodo`, {
        text,
        username: user.username,
      });
      fetchTodos().then((fetchedTodos) => {
        const sortedTodos = sortTodos(fetchedTodos);
        setTodos(sortedTodos);
      });
      setIsUpdating(false);
      setText("");
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  };

  const updateTodo = async (todoId, text) => {
    try {
      await axios.put(`http://localhost:4000/api/todo/updateTodo/${todoId}`, {
        text,
      });
      fetchTodos().then((fetchedTodos) => {
        const sortedTodos = sortTodos(fetchedTodos);
        setTodos(sortedTodos);
      });
      setIsUpdating(false);
      setText("");
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  };

  const updateTodoStatus = async (todoId, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/todo/updateTodoStatus/${todoId}`,
        { status }
      );
      fetchTodos().then((fetchedTodos) => {
        const sortedTodos = sortTodos(fetchedTodos);
        setTodos(sortedTodos);
      });
    } catch (error) {
      console.error("Error updating todo status:", error);
      throw error;
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
      await axios.delete(`http://localhost:4000/api/todo/deleteTodo/${todoId}`);
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  };

  return (
    <div className={styles.todoOveralllConatainer}>
      <div className={styles.imageContainer}>
        <img src={imgTodo} alt="Not found" />
      </div>
      <div className={styles.mainTodoContainer}>
        <div className={styles.todoContainer}>
          <i className="fa-solid fa-list-check"></i>
          <h1>ToDo list</h1>
        </div>
        <div className={styles.todoTop}>
          <input
            type="text"
            placeholder="Add ToDoList here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <div
            className={styles.todoAdd}
            onClick={
              isUpdating
                ? () => updateTodo(toDoId, text)
                : () => createTodo(text)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className={styles.todoListContainer}>
          {!isLoading && todos.length !== 0 && (
            <div className={styles.todoList}>
              {todos.map((item) => (
                <TodoEditor
                  key={item._id}
                  text={item.text}
                  completed={item.status === "Completed"}
                  updateMode={() => updateMode(item._id, item.text)}
                  deleteToDo={() => deleteTodo(item._id)}
                  updateTodoStatus={() =>
                    updateTodoStatus(item._id, "Completed")
                  }
                  todoId={item._id}
                />
              ))}
            </div>
          )}
          {!isLoading && todos.length === 0 && (
            <div className={styles.todoInfo}>
              <p>No todos added yet!</p>
            </div>
          )}
          {isLoading && (
            <div className={styles.todoInfo}>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoBase;
