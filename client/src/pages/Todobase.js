import React, { useEffect, useState } from "react";
import styles from "../styles/TodoEditor.module.css";
import TodoEditor from "../components/TodoEditor";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import imgTodo from '../image/authBG.png'

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
        getAllTodos(); // Refresh todos after successful creation
        // Reset state after creation
        setIsUpdating(false);
        setText("");
      } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
      }
    };
  
    const updateTodo = async (todoId, text) => {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/todo/updateTodo/${todoId}`,
          { text }
        );
        console.log(response.data);
        getAllTodos(); // Refresh todos after successful update
        // Reset state after update
        setIsUpdating(false);
        setText("");
      } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
      }
    };
  
    const updateTodoStatus = async (todoId, status) => {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/todo/updateTodoStatus/${todoId}`,
          { status }
        );
        console.log(response.data);
        getAllTodos(); // Refresh todos after successful status update
      } catch (error) {
        console.error("Error updating todo status:", error);
        throw error;
      }
    };
  
    const deleteTodo = async (todoId) => {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/todo/deleteTodo/${todoId}`
        );
        console.log(response.data);
        getAllTodos(); // Refresh todos after successful deletion
      } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
      }
    };
  
   // TodoBase component
return (
  <div className={styles.todoOveralllConatainer}>
    <div className={styles.imageContainer}>
      <img src={imgTodo} alt="Not found" />
    </div>
    <div className={styles.mainTodoContainer}>
      <div className={styles.todoContainer}>
        <i class="fa-solid fa-list-check"></i>
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
          {isUpdating ? "Update" : "Add"}
        </div> 
      </div>
      <div className={styles.todoListContainer}>
        <div className={styles.todoList}>
          {todos.map((item) => (
            <TodoEditor
              key={item.id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteTodo(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

  };
  
  export default TodoBase;
