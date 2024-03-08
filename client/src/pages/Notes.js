import React, { useState } from "react";
import Editor from "../components/Editor";
import { Link } from "react-router-dom";
import styles from "../styles/Notes.module.css";
import io from "socket.io-client";
import { useNotes } from "../hooks/useNotes";
import { useUploadNotes } from "../hooks/useUploadNotes";
import { useEffect } from 'react'

// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        // text: "Start Typing...",
        // level: 1,
      },
    },
  ],
};



const Notes = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const socket = io('http://localhost:5000'); // Connect to server
  const { notes, error, isLoading } = useNotes();
  const {getNotes, Error , isloading} = useUploadNotes();
  const [email, setEmail] = useState('');

  const openSideNav = () => {
    setIsSideNavOpen(true);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
  }, []);

  const handleNotes = async (e) => {
    e.preventDefault();

    try {
      // Add the user's email to the data
      const newData = { ...data, email: email };

      // Save the notes with the updated data
      await notes(newData);

      alert(JSON.stringify(newData));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };
  
  return (
    <div className={styles.editor}>
      <div id={styles.lines} onClick={openSideNav}>&#9776;</div>
      <div className={`${styles.sidenav} ${isSideNavOpen ? styles.open : ''}`}>
        <div className={styles.closebtn} onClick={closeSideNav}>&times;</div>
        
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        
      </div>
      <Editor data={data} onChange={setData} editorblock="editorjs-container" socket={socket}/>
      <button
  className={styles.savebtn}
  onClick={(e) => {
     handleNotes(e);
    alert(JSON.stringify(data));
  }}
>
  Save
</button>
    </div>
  );
}

export default Notes;
