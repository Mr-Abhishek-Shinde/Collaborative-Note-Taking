import React from "react";
import styles from "../styles/Notes.module.css";

const Sidebar = ({ notes, sharedNotes, handleNoteClick, handleNewNote, closeSideNav, isSideNavOpen }) => {
  return (
    <div className={`${styles.sidenav} ${isSideNavOpen ? styles.open : ''}`}>
      <div className={styles.closebtn} onClick={closeSideNav}>&times;</div>
      <ul>
        <h1>My Note</h1>
        {notes.map((item, index) => (
          <li key={index} onClick={() => handleNoteClick(item._id)}>
            {item.title}
          </li>
        ))}
      </ul>
      <ul>
        <h1>Shared With Me</h1>
        {sharedNotes.map((item, index) => (
          <li key={index} onClick={() => handleNoteClick(item._id)}>
            {item.title}
          </li>
        ))}
      </ul>
      <button onClick={handleNewNote}>New note</button>
    </div>
  );
};

export default Sidebar;
