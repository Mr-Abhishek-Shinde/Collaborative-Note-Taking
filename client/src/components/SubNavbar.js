// SubNavbar.jsx

import React, { useState, useEffect, useRef  } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import styles from "../styles/Notes.module.css";
import { useAuthContext } from "../hooks/useAuthContext";


const SubNavbar = ({ handleAccess, setExtractedText, setisSpeech, toggleDiscuss, openSideNav }) => {
  const [recognition, setRecognition] = useState(null);
  // const { user } = useAuthContext();
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);

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
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  return (
    <div className={styles.subnavbar}>
      <div className={styles.subnavbarLeft}>
        <div id={styles.lines} onClick={openSideNav}>
          &#9776;
        </div>
      </div>
      {/* {user && (
          <li className={styles.navLink} ref={dropdownRef}>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn} onClick={toggleDropdown}>
                <h3 className={styles.plus}>+</h3>
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdowncontent}>
                  <Link>New note</Link>
                  <Link>Add Comments</Link>
                </div>
              )}
            </div>
          </li>
        )} */}
      <div className={styles.subnavbarRight}>
        <button className={styles.subButton} onClick={showAccessForm}>Give Access</button>
        <button className={styles.subButton} onClick={toggleRecognition}>Speech to text</button>
        <button className={`${styles.subButton} ${styles.transit}`} onClick={toggleDiscuss}>Discuss</button>
      </div>
      
      
    </div>
  );
};

export default SubNavbar;
