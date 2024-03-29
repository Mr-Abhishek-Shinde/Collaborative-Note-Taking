import { React, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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

  return (
    <>
      <div>
        <button onClick={createBlankNote}>Create new blank note</button>
      </div>
      <div>
        <h2>My Notes:</h2>
        <ul>
          {notesList.map((note) => (
            <li key={note._id} onClick={() => navigate(`/notes/note/${note._id}`)}>{note.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Shared with me:</h2>
        <ul>
          {sharedNotesList.map((note) => (
            <li key={note._id} onClick={() => navigate(`/notes/note/${note._id}`)}>{note.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NotesHome;
