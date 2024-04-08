import axios from "axios";

const baseUrl= "http://localhost:5000/api/todo"
// const baseUrl= "http://localhost:4000/api/notes/createTodo/"

const getAllToDo = (setToDo) => {
    axios
    .get(baseUrl)
    .then(({data})=> {
        console.log('data-->', data);
        setToDo(data)
    })
}

const addToDo = (text, setText, setToDo) => {
    axios 
    .post(`${baseUrl}/save`, { text })
    .then((response) => {
        console.log(response.data);
        setText("");
        getAllToDo(setToDo);
    })
    .catch((error) => {
        console.error("Error adding todo:", error);
    });
}

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    axios 
    .post(`${baseUrl}/update`, {_id:toDoId, text })
    .then((data) => {
        setText("")
        setIsUpdating(false)
        getAllToDo(setToDo);
    })
    .catch((error) => {
        console.error("Error adding todo:", error);
    });
}

const deleteToDo = (_id, setToDo) => {
    axios 
    .post(`${baseUrl}/delete`, {_id})
    .then((data) => {
        
        getAllToDo(setToDo);
    })
    .catch((error) => {
        console.error("Error adding todo:", error);
    });
}


export {getAllToDo, addToDo, updateToDo, deleteToDo}