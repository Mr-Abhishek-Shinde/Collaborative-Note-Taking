import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";
import styles from "../styles/Notes.module.css";

// Import socket.io-client
import io from "socket.io-client";
import { useNotes } from "../hooks/useNotes";
import Axios from 'axios';

// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {},
    },
  ],
};

const Notes = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const socket = io('http://localhost:4000'); // Connect to server
  const { notes } = useNotes();
  const [email, setEmail] = useState('');
  const [list, setList] = useState([]);
  const [emailSet, setEmailSet] = useState(false);
  const [respo, setRespo] = useState(false);
  const [noteName, setNoteName] = useState('');

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

  useEffect(() => {
    if (emailSet) {
       Axios.get(`http://127.0.0.1:4000/api/notes/getnotes?email=${email}`)
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

  const handleNotes = async () => {
    // Prompt the user to enter the note name
    const nName = prompt("Enter the name of the note:");
  
    // Check if the user entered a note name
    if (nName !== null && nName.trim() !== "") {
      try {
        // Set the note name state
        setNoteName(nName);
  
        // Add the user's email and note name to the data
        const newData = { ...data, email: email, noteName: nName };
  
        // Save the notes with the updated data
        // Assuming notes is a function that handles saving data
        await notes(newData);
  
        alert(`Note "${nName}" saved successfully.`);
      } catch (error) {
        console.error("Error saving notes:", error);
      }
    } else {
      alert("Please enter a valid note name.");
    }
  };
  
  let keys;
  if (respo) {
    try {
      let parsedList = JSON.parse(list.uploadnotes); // Parse the JSON string
      console.log(parsedList);
    
      if (Array.isArray(parsedList)) {
        keys = (
          <ul>
            {parsedList.map((subArray, index) => (
              <li key={index}>
                <ul>
                  {subArray.map((item) => (
                    <li key={item.id}>{item.id}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        );
      } else {
        keys = <li>Object is not available.</li>;
      }
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
      <Editor data={data} onChange={setData} editorblock="editorjs-container" socket={socket}/>
      <button
        className={styles.savebtn}
        onClick={(e) => {
          handleNotes(e);
          // alert(JSON.stringify(data));
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Notes;
