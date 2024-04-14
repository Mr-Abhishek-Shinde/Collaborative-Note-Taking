import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "../styles/NotesHome.module.css";
import notesHome from "../image/notesHome.png";

const NotesHome = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [notesList, setNotesList] = useState([]);
  const [sharedNotesList, setSharedNotesList] = useState([]);
  
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

  const saveClickedSharedNote = (noteId) => {
    navigate(`/notes/note/${noteId}`);
  };
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/note/getAllNotes/" + user.username);
        setNotesList(response.data.notes);
        setSharedNotesList(response.data.sharedNotes);
      } catch (error) {
        console.error("Error Fetching Notes:", error);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);

  return (
    <div className={styles.NotesHome}>
      <div className={styles.mainNoteHome}>

        <div className={styles.headingNote}>
          <h1 className={styles.headingNoteH1}>NoteBook Options</h1>
        </div>
        <hr />

        <div className={styles.createNewNote}>
          <div className={styles.createBtn}>
            <h3>Want to create new note?</h3>
            
            <button onClick={createBlankNote}>
              <i className="fa-solid fa-plus"></i>Create</button>
          </div>
        </div>

        <hr />
        
        <div className={styles.cardContainer}>
          
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.headLogo}>
                <h2 className={styles.heading}>
                  <i className="fa-solid fa-book"></i>
                  My Notes
                </h2>
              </div>
              <div className={styles.notesList}>
                <ul className={styles.notes}>
                  {notesList.map((note) => (
                    <li key={note._id} onClick={() => navigate(`/notes/note/${note._id}`)}>
                      <i className="fa-regular fa-note-sticky"></i> {note.title} notes
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.imgParaContainer}>
            <img src={notesHome} alt="not found :)" className={styles.cardImage}></img>
            <p className={styles.cardPara}>
              <i className="fa-regular fa-clipboard"></i>
              lets note down the things to keep track
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.headLogo}>
                <h2>
                  <i className="fa-solid fa-layer-group"></i>
                  Shared Notes
                </h2>
              </div>
              <div className={styles.notesList}>
                <ul className={styles.notes}>
                  {sharedNotesList.map((note) => (
                    <li key={note._id} onClick={() => saveClickedSharedNote(note._id)}>
                      <i className="fa-regular fa-note-sticky"></i> {note.title} notes
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesHome;
