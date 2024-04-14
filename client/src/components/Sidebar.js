import React, { useState, useRef } from "react";
import styles from "../styles/Notes.module.css";

const Sidebar = ({ notes, sharedNotes, handleNoteClick, handleNewNote, closeSideNav, isSideNavOpen }) => {
  
  const [isMyDropdownOpen, setMyDropdownOpen] = useState(false);
  const [isSharedDropdownOpen, setSharedDropdownOpen] = useState(false);
  const dropdownMy = useRef(null);
  const dropdownShared = useRef(null);

  const toggleMyDropdown = () => {
    setMyDropdownOpen(prevState => !prevState);
  };

  const toggleSharedDropdown = () => {
    setSharedDropdownOpen(prevState => !prevState);
  };

  return (
    <div className={`${styles.sidenav} ${isSideNavOpen ? styles.open : ''}`}>
      <div className={styles.closebtn} onClick={closeSideNav}>&times;</div>
      
      <ul className={styles.navLinks} ref={dropdownMy}>
        <button className={styles.dropbutn} onClick={toggleMyDropdown}>
          <h3 className={styles.headDrp}>
            <i className="fa-solid fa-book"></i>
            My Notes
            <span className={`${styles.dropdownIcon} ${isMyDropdownOpen ? styles.rotate180 : ''}`}>▼</span>
          </h3>
        </button>
        {isMyDropdownOpen && (
          <div className={styles.dropContent}>
            {notes.map((item, index) => (
              <li key={index} onClick={() => handleNoteClick(item._id)}>
                <i className="fa-regular fa-note-sticky"></i>{item.title}
              </li>
            ))}
          </div>
        )}
      </ul>
      
      <ul className={styles.navLinks} ref={dropdownShared}>
        <button className={styles.dropbutn} onClick={toggleSharedDropdown}>
          <h3 className={styles.headDrp}>
            <i className="fa-solid fa-layer-group"></i>
            Shared Notes
            <span className={`${styles.dropdownIcon} ${isSharedDropdownOpen ? styles.rotate180 : ''}`}>▼</span>
          </h3>
        </button>
        {isSharedDropdownOpen && (
          <div className={styles.dropContent}>
            {sharedNotes.map((item, index) => (
              <li key={index} onClick={() => handleNoteClick(item._id)}>
                <i className="fa-regular fa-note-sticky"></i>{item.title}
              </li>
            ))}
          </div>
        )}
      </ul>
      
      <div className={styles.sidenavBtn}>
      <button className={styles.newNoteButton} onClick={handleNewNote}>New note</button>
      </div>
    </div>
  );
};

export default Sidebar;
