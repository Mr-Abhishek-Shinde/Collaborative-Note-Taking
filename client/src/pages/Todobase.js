import React, { useEffect, useState } from "react";
import styles from "../styles/TodoEditor.module.css";
import TodoEditor from "../components/TodoEditor";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const TodoBase = () => {
    const { user } = useAuthContext();
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [toDoId, setToDoId] = useState("");
  
    const getAllTodos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/todo/getTodos/${user.username}`
          );
          setTodos(response.data);
        } catch (error) {
          console.error("Error fetching todos:", error);
          throw error;
        }
      };
  

    useEffect(() => {
      if(user){
        getAllTodos();
      }
    }, [user]);
  
    const updateMode = (_id, text) => {
      setIsUpdating(true);
      setText(text);
      setToDoId(_id);
    };
  
    const createTodo = async (text) => {
      try {
        const response = await axios.post(
          `http://localhost:4000/api/todo/createTodo`,
          { text, username: user.username }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
      }
      getAllTodos();
    };
  
    const updateTodo = async (todoId, text) => {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/todo/updateTodo/${todoId}`,
          { text }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
      }
      getAllTodos();
    };
  
    const updateTodoStatus = async (todoId, status) => {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/todo/updateTodoStatus/${todoId}`,
          { status }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating todo status:", error);
        throw error;
      }
      getAllTodos();
    };
  
    const deleteTodo = async (todoId) => {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/todo/deleteTodo/${todoId}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
      }
      getAllTodos();
    };
  
    return (
      <div className={styles.mainTodoContainer}>
        <div className={styles.todoContainer}>
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
            onClick={isUpdating ? () => updateTodo(toDoId, text) : () => createTodo(text)}
          >
            Add
          </div>
        </div>
        <div className={styles.todoList}>
          {todos.map((item) => (
            <TodoEditor
              key={item.id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)} // Uncommented this line
              deleteToDo={() => deleteTodo(item._id)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default TodoBase;