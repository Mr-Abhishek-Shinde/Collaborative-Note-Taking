// Notes.jsx

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SubNavbar from "../components/SubNavbar";
import NoteEditor from "../components/NoteEditor";
import Discussion from "../components/Discussion";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/Notes.module.css";
import axios from "axios";

const Notes = () => {
  const { noteId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [sharedNotesList, setSharedNotesList] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [isSpeech, setisSpeech] = useState(false);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);

  const openSideNav = () => {
    fetchNotes();
    setIsSideNavOpen(true);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleNoteClick = (noteId) => {
    closeSideNav();
    navigate(`/notes/note/${noteId}`);
  };

  const createBlankNote = () => {
    axios
      .post("http://localhost:4000/api/note/createNote", {
        title: "Untitled",
        content: {
          ops: [
            {
              insert: "Start Typing...\n",
            },
          ],
        },
        username: user.username,
      })
      .then((response) => {
        navigate(`/notes/note/${response.data.noteId}`);
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
    closeSideNav();
  };

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

  const handleAccess = (username) => {
    axios
      .post("http://localhost:4000/api/note/addCollaborator/" + noteId, {
        username: username,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error Adding Collaborator:", error);
      });
  };

  const toggleDiscuss = () => {
    setIsDiscussionOpen(!isDiscussionOpen);
    // setMainContainerWidth(isDiscussionOpen ? '100%' : '50%');
  };

  return (
    <>
      <Sidebar
        notes={notesList}
        sharedNotes={sharedNotesList}
        handleNoteClick={handleNoteClick}
        handleNewNote={createBlankNote}
        closeSideNav={closeSideNav}
        isSideNavOpen={isSideNavOpen}
      />
      <SubNavbar
        handleAccess={handleAccess}
        setExtractedText={setExtractedText}
        setisSpeech={setisSpeech}
        toggleDiscuss={toggleDiscuss}
        openSideNav={openSideNav} // sideNav in subnavbar
      />
      
      <div className={styles.notesContainer}>
        <div className={styles.mainContainer} style={{ width: '100%' }}>
          <div style={{ width: isDiscussionOpen ? '50%' : '100%', marginLeft: isDiscussionOpen ? '15px' : '0' }}>
            <NoteEditor
              user={user}
              extractedText={extractedText}
              isSpeech={isSpeech}
            />
          </div >
          {isDiscussionOpen && (
            <Discussion username={user.username} roomId={noteId} />
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
