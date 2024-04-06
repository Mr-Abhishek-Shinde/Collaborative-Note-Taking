import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteHistory = ({ noteId }) => {
  const [versions, setVersions] = useState([]);

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

  const handleClick = async (versionIndex) => {
    try {
      const originalIndex = versions.length - 1 - versionIndex;
      const response = await axios.get("http://localhost:4000/api/note/getNoteByVersion/" + noteId + "/" + originalIndex);
      console.log('Clicked version:', response.data);
    } catch (error) {
      console.error('Error fetching version details:', error);
    }
  };

  return (
    <div>
      <h2>Note History</h2>
      <ul>
        {versions.map((version, index) => (
          <li key={index}>
            <div>Version {versions.length - index}</div>
            <div>Update Message: {version.updateMessage}</div>
            <div>Modified At: {new Date(version.modifiedAt).toLocaleString()}</div>
            <div>Modified By: {version.modifiedBy}</div>
            <button onClick={() => handleClick(index)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteHistory;
