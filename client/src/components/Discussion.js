import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from "axios";

const socket = socketIOClient('http://localhost:5000');

const Discussion = ({ username, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('join room', roomId);

    // Fetch message history when the component mounts
    fetchMessages();

    // Listen for new messages
    socket.on('chat message', (msg) => {
      console.log(msg)
      // Add the new message to the existing messages
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      // socket.off('chat message');
      socket.emit('leave room', roomId);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/message/getMessages/${roomId}`);
      if (!response.data.success) {
        throw new Error('Failed to fetch messages');
      }
      setMessages(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', { roomId, user: username, text: input });
    saveMessage({ noteId: roomId, user: username, text: input });
    setInput('');
  };

  const saveMessage = async (message) => {
    try {
      const response = await axios.post('http://localhost:4000/api/message/saveMessage', message);
      if (!response.data.success) {
        throw new Error('Failed to save message');
      }
      console.log('Message saved to MongoDB:', message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Discussion</h1>
      <h4>You can discuss about this note with the collaborators</h4>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.user}: {message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleMessageSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Discussion;
