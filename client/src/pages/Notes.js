import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SubNavbar from "../components/SubNavbar";
import NoteEditor from "../components/NoteEditor";
import Discussion from "../components/Discussion";
import NoteHistory from "../components/NoteHistory";
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const openSideNav = () => {
    fetchNotes();
    setIsSideNavOpen(true);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleNoteClick = (noteId) => {
    closeSideNav();
    const newUrl = `/notes/note/${noteId}`;
    window.location.href = newUrl;
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

  const toggleDiscuss = () => {
    setIsDiscussionOpen(!isDiscussionOpen);
    if(isHistoryOpen){
      setIsHistoryOpen(false);
    }
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
    if(isDiscussionOpen){
      setIsDiscussionOpen(false);
    }
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
        setExtractedText={setExtractedText}
        setisSpeech={setisSpeech}
        toggleDiscuss={toggleDiscuss}
        toggleHistory={toggleHistory}
        openSideNav={openSideNav}
        noteId={noteId}
      />
      
      <div className={styles.notesContainer}>
        <div className={styles.mainContainer} style={{ width: '100%' }}>
          <div style={{
            width: (isDiscussionOpen || isHistoryOpen) ? '100%' : '100%',
            marginRight: (isDiscussionOpen || isHistoryOpen) ? '340px' : '0'
          }}>
            <NoteEditor
              user={user}
              extractedText={extractedText}
              isSpeech={isSpeech}
            />
          </div >
          {isDiscussionOpen && (
            <Discussion username={user.username} roomId={noteId} />
          )}
          {isHistoryOpen && (
            <NoteHistory noteId={noteId} />
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
