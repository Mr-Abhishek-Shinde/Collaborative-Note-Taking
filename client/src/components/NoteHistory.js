import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../styles/Notes.module.css";
import NotePopup from './NotePopup';

const NoteHistory = ({ noteId }) => {
  const [versions, setVersions] = useState([]);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [noteData, setNoteData] = useState(null);
  const [noteVersion, setNoteVersion] = useState(null);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/note/getAllNoteVersions/" + noteId);
        setVersions(response.data.reverse());
      } catch (error) {
        console.error('Error fetching note versions:', error);
      }
    };

    fetchVersions();
  }, [noteId]);

  const handleClick = async (versionIndex, version) => {
    try {
      const originalIndex = versions.length - 1 - versionIndex;
      const response = await axios.get("http://localhost:4000/api/note/getNoteByVersion/" + noteId + "/" + originalIndex);
      console.log('Clicked version:', response.data.content);
      setShowNotePopup(true);
      setNoteData(response.data.content)
      setNoteVersion(version)
    } catch (error) {
      console.error('Error fetching version details:', error);
    }
  };

  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyHeading}>
        <i class="fa-solid fa-clock-rotate-left"></i>
        Note History
      </h2>
      <ul className={styles.hisLinks}>
        {versions.map((version, index) => (
          <li key={index}>
            <div className={styles.hisVersion}>
              <i class="fa-solid fa-caret-right"></i>
              Version {versions.length - index}
            </div>
            <div className={styles.hisInfo}>Update Message: "{version.updateMessage}"</div>
            <div className={styles.hisInfo}>Modified At: {new Date(version.modifiedAt).toLocaleString()}</div>
            <div className={styles.hisInfo}>Modified By: {version.modifiedBy}</div>
            <button className={styles.hisViewButton} onClick={() => handleClick(index, version)}>View Details</button>
          </li>
        ))}
      </ul>
      {showNotePopup && <NotePopup onClose={() => setShowNotePopup(false)} noteData={noteData} noteVersion={noteVersion} />}
    </div>
  );
};

export default NoteHistory;
