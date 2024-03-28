import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from 'socket.io-client';

const Editor = () => {
  const [value, setValue] = useState('');
  const socket = io('http://localhost:4000');

  useEffect(() => {
    // Receive updated content from other clients
    socket.on('update-data', (content) => {
      setValue(content);
    });

    return () => {
      // Clean up socket connection
      socket.disconnect();
    };
  }, [socket]);

  const handleChange = (content) => {
    // Update local state
    setValue(content);
    // Broadcast changes to other clients
    socket.emit('data-change', content);
  };

  return (
    <ReactQuill theme="snow" value={value} onChange={handleChange} />
  );
}

export default Editor;
