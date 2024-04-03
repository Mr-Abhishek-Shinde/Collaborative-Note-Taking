import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "../styles/Notes.module.css";

const SubNavbar = ({ handleAccess, setExtractedText, setisSpeech, toggleDiscuss }) => {
  const [recognition, setRecognition] = useState(null);

  const showAccessForm = async () => {
    const { value: username } = await Swal.fire({
      title: "Add New Collaborator",
      input: "text",
      inputLabel: "Username",
      inputPlaceholder: "Enter the username of collaborator",
    });
    if (username) {
      handleAccess(username);
    }
  };

  const toggleRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      Swal.fire({
        icon: 'error',
        title: 'Speech Recognition Not Supported',
        text: 'Your browser does not support Speech Recognition. Please use a compatible browser.',
      });
    } else {
      if (!recognition || recognition && recognition.aborted) {
        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.continuous = true;
        newRecognition.interimResults = true;
        newRecognition.lang = 'en-US';
        newRecognition.onstart = function() {
          Swal.fire({
            icon: 'success',
            title: 'Speak Now...!',
          });
        };
        newRecognition.onresult = function(event) {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            }
          }
          
          console.log(finalTranscript);
          if(finalTranscript.length > 0) {
             setisSpeech(true);
             setExtractedText((prevText) => prevText + finalTranscript); // Append new text to existing text
          }
          else{
            setisSpeech(false);
          }
        };
        newRecognition.onerror = function(event) {
          console.error('Speech recognition error:', event.error);
        };
        newRecognition.onend = function() {
          console.log('Speech recognition ended');
          Swal.fire({
            icon: 'info',
            title: 'Speech Recognition Stopped',
          });
        };
        newRecognition.start();
        setRecognition(newRecognition);
      } else {
        if (recognition && recognition.readyState === 'listening') {
          recognition.stop();
          Swal.fire({
            icon: 'info',
            title: 'Speech Recognition Stopped',
          });
        } else {
          recognition.start();
          Swal.fire({
            icon: 'success',
            title: 'Speech Recognition Started',
          });
        }
      }
    }
  };

  return (
    <div className={styles.subnavbar}>
      <button onClick={showAccessForm}>Give Access</button>
      <button onClick={toggleRecognition}>Speech to text</button>
      <button onClick={toggleDiscuss}>Discuss</button>
    </div>
  );
};

export default SubNavbar;
