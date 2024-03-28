import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";
import styles from "../styles/Notes.module.css";
// import { Link } from 'react-router-dom';
import io from "socket.io-client";
import { useNotes } from "../hooks/useNotes";
import Axios from 'axios';

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        },
    },
  ],
};

const Notes = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const socket = io('http://localhost:4000');
  const { notes } = useNotes();
  const [email, setEmail] = useState('');
  const [list, setList] = useState([]);
  const [emailSet, setEmailSet] = useState(false);
  const [respo, setRespo] = useState(false);
  // eslint-disable-next-line
  const [noteName, setNoteName] = useState('');

  //to extract the user email.id from the token
  useEffect(() => {                       
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
    setEmailSet(true);
  }, []);

  const openSideNav = () => {
    setIsSideNavOpen(true);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  //To get the all saved notes of the specified user
  useEffect(() => {
    if (emailSet) {
       Axios.get(`http://127.0.0.1:4000/api/notes/getAllNotesByUser?email=${email}`)
        .then((response) => {
          console.log(response)
          setList(response.data);
          setRespo(true)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [email, emailSet]);

  //TO save the new note of the specified user
  const handleNotes = async () => {
    const nName = prompt("Enter the name of the note:");
    if (nName !== null && nName.trim() !== "") {
      try {
        setNoteName(nName);
        const newData = { ...data, email: email, noteName: nName };
        await notes(newData);
        alert(`Note "${nName}" saved successfully.`);
      } catch (error) {
        console.error("Error saving notes:", error);
      }
    } else {
      alert("Please enter a valid note name.");
    }
  };


  //To handle the case when an existing note is requested 
  const handleNoteClick = async (item) => {
    alert(item.noteName);
    let parsedList = JSON.parse(list.uploadnotes);
    for (let i = 0; i < parsedList.length; i++) {
      if (parsedList[i].noteName === item.noteName) {
        const { noteName, blocks, ...rest } = parsedList[i];
        const newData = { ...rest, blocks: [...blocks] };
        await setData(newData);
        break;
      }
    }
  };
  
  let keys;
  if (respo) {
    try {
      let parsedList = JSON.parse(list.uploadnotes);
      console.log(parsedList);
      keys = (
        <ul>
          {parsedList.map((item, index) => (
            <li key={index} onClick={() => handleNoteClick(item)}>
              {item.noteName}
            </li>
          ))}
        </ul>
      );
    } catch (error) {
      console.error('Error rendering keys:', error);
      keys = <li>Error rendering keys.</li>;
    }
  }

  return (
    <div className={styles.editor}>
      <div id={styles.lines} onClick={openSideNav}>&#9776;</div>
      <div className={`${styles.sidenav} ${isSideNavOpen ? styles.open : ''}`}>
        <div className={styles.closebtn} onClick={closeSideNav}>&times;</div>
        {keys}
      </div>
      
      <Editor initialData={data} onChange={setData} editorblock="editorjs-container" socket={socket}/>
      <button
        className={styles.savebtn}
        onClick={(e) => {
          handleNotes(e);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Notes;
