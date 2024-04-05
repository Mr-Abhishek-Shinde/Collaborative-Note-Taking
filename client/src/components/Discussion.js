import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import axios from "axios";
import styles from "../styles/Notes.module.css";

const socket = socketIOClient('http://192.168.56.1:5000');

const Discussion = ({ username, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit('join room', roomId);
    fetchMessages();
    socket.on('chat message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.emit('leave room', roomId);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://192.168.56.1:4000/api/message/getMessages/${roomId}`);
      if (!response.data.success) {
        throw new Error('Failed to fetch messages');
      }
      setMessages(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    socket.emit('chat message', { roomId, user: username, text: input });
    saveMessage({ noteId: roomId, user: username, text: input });
    setInput('');
  };

  const saveMessage = async (message) => {
    try {
      const response = await axios.post('http://192.168.56.1:4000/api/message/saveMessage', message);
      if (!response.data.success) {
        throw new Error('Failed to save message');
      }
      console.log('Message saved to MongoDB:', message);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.disContainer}>
      <div className={styles.headerDis}>
        <h1>
          <i class="fa-regular fa-comments"></i>
          Discuss
        </h1>
      </div>

      <div className={styles.bodyDis}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${message.user === username ? styles.myMessage : styles.otherMessage}`}
          >
            <span className={styles.username}>{message.user}: </span>
            <span className={styles.messageContent}>{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.footerDis}>
        <form onSubmit={handleMessageSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <br />
          <button type="submit">
            <i class="fa-solid fa-paper-plane"></i>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Discussion;
