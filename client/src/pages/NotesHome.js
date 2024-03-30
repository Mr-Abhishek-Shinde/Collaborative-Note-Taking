import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "../styles/NotesHome.module.css";
import mynotes from "../image/mynotes.jpg"

const NotesHome = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isMyNotesDropdownOpen, setMyNotesDropdownOpen] = useState(false);
  const [isSharedNotesDropdownOpen, setSharedNotesDropdownOpen] = useState(false);
  const myNotesDropdownRef = useRef(null);
  const sharedNotesDropdownRef = useRef(null);

  const [notesList, setNotesList] = useState([]);
  const [sharedNotesList, setSharedNotesList] = useState([]);

  const toggleMyNotesDropdown = () => {
    setMyNotesDropdownOpen(!isMyNotesDropdownOpen);
  };

  const toggleSharedNotesDropdown = () => {
    setSharedNotesDropdownOpen(!isSharedNotesDropdownOpen);
  };

  const createBlankNote = () => {
    axios
      .post("http://localhost:4000/api/note/createNote", {
        title: "Untitled",
        content: {
          "ops": [
            {
              "insert": "Start Typing...\n"
            }
          ]
        },
        username: user.username,
      })
      .then((response) => {
        navigate(`/notes/note/${response.data.noteId}`);
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
  };

  // useEffect for fetching notes
  useEffect(() => {
    const fetchNotes = async () => {
      axios
        .get("http://localhost:4000/api/note/getAllNotes/" + user.username)
        .then((response) => {
          setNotesList(response.data.notes);
          setSharedNotesList(response.data.sharedNotes);
        })
        .catch((error) => {
          console.error("Error Fetching Notes:", error);
        });
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);

  // useEffect for handling click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        myNotesDropdownRef.current &&
        !myNotesDropdownRef.current.contains(event.target)
      ) {
        setMyNotesDropdownOpen(false);
      }
      if (
        sharedNotesDropdownRef.current &&
        !sharedNotesDropdownRef.current.contains(event.target)
      ) {
        setSharedNotesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.NotesHome}>
      <div className={styles.mainNoteHome}>

        <div className={styles.headingNote}>
          <h1 className={styles.headingNoteH1}>NoteBook Options</h1>
        </div>
        <hr></hr>

        <div className={styles.createContainer}>
          <div className={styles.createBtn}>
            <button onClick={createBlankNote}>Create new blank note</button>
          </div>
        </div>

        <hr></hr>
        
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            
            {/* <img src={mynotes} alt="My Notes" className={styles.cardImage} /> */}
            <div className={styles.cardContent}>
              <div className={styles.headLogo}>
                
                <h2>
                  <i class="fa-solid fa-book"></i>
                  My Notes
                </h2>
              </div>
              <button className={styles.dropdownButton} onClick={toggleMyNotesDropdown}>
                <h3>Show Notes</h3>
              </button>
              {isMyNotesDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {notesList.map((note) => (
                    <li key={note._id} onClick={() => navigate(`/notes/note/${note._id}`)}>
                      {note.title}
                    </li>
                  ))}
                </div>
              )}
            </div>
            
          </div>

          <div className={styles.card}>
            {/* <img src="/path_to_your_image" alt="Shared with me" className={styles.cardImage} /> */}
            <div className={styles.cardContent}>
            <div className={styles.headLogo}>
                
                <h2>
                <i class="fa-solid fa-layer-group"></i>
                  Shared with me
                </h2>
              </div>
              <button className={styles.dropdownButton} onClick={toggleSharedNotesDropdown}>
                <h3>Show Notes</h3>
              </button>
              {isSharedNotesDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {sharedNotesList.map((note) => (
                    <li key={note._id} onClick={() => navigate(`/notes/note/${note._id}`)}>
                      {note.title}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default NotesHome;
