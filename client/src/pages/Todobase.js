import React, { useEffect, useState } from "react";
import styles from "../styles/TodoEditor.module.css";
import Todo from "../components/TodoEditor"
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "../components/TodoHandle"

const  TodoBase = () => {
    const [toDo,setToDo] = useState([])
    const [text, setText] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)
    const [toDoId, setToDoId] = useState("")
    useEffect(() => {
        getAllToDo(setToDo)
        // updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
    },[])

    const updateMode =(_id, text) =>{
        setIsUpdating(true)
        setText(text)
        setToDoId(_id)
    }

    return (
        <div className={styles.mainTodoContainer}>
            <div className={styles.todoContainer}>
                <h1>
                    ToDo list
                </h1>
            </div>
            <div className={styles.todoTop}>
                <input
                    type="text"
                    placeholder="Add ToDoList here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}>
                </input>
                <div 
                    className={styles.todoAdd} 
                    onClick={isUpdating ? (toDoId, text, setToDo, setText, setIsUpdating)=> updateToDo() 
                    : () => addToDo(text, setText, setToDo)}>
                    {/* {isUpdating ? "Update" : "Add"} */}
                    Add
                </div>
            </div>
            <div className={styles.todoList}>
                {toDo.map((item) => 
                    <Todo 
                    key={item.id} 
                    text={item.text}
                    updateMode={()=>updateMode(item._id, item.text)}
                    deleteToDo={()=> deleteToDo(item._id, setToDo)}/>
                )}
                {/* <Todo text="hi" /> */}
            </div>

            
            
        </div>
        
    )
}

export default TodoBase

