// SubNavbar.jsx

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AccessPopup from "./AccessPopup";
import styles from "../styles/Notes.module.css";

const SubNavbar = ({ setExtractedText, setisSpeech, toggleDiscuss, toggleHistory, openSideNav, noteId }) => {
  const [recognition, setRecognition] = useState(null);
  const [isRecognitionOn, setIsRecognitionOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  const showAccessPopup = () => {
    setShowPopup(true);
  }

  const toggleRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      Swal.fire({
        icon: "error",
        title: "Speech Recognition Not Supported",
        text: "Your browser does not support Speech Recognition. Please use a compatible browser.",
      });
    } else {
      if (!recognition || (recognition && recognition.aborted)) {
        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.continuous = true; // Set continuous to true
        newRecognition.interimResults = true;
        newRecognition.lang = "en-US";
        newRecognition.onstart = function () {
          setIsRecognitionOn(true);
          Swal.fire({
            icon: "success",
            title: "Speech Recognition Started",
          });
        };
        newRecognition.onresult = function (event) {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            }
          }

          console.log(finalTranscript);
          if (finalTranscript.length > 0) {
            setisSpeech(true);
            setExtractedText((prevText) => prevText + finalTranscript); // Append new text to existing text
          } else {
            setisSpeech(false);
          }
        };
        newRecognition.onerror = function (event) {
          console.error("Speech recognition error:", event.error);
        };
        newRecognition.onend = function () {
          setIsRecognitionOn(false);
          console.log("Speech recognition ended");
          Swal.fire({
            icon: "info",
            title: "Speech Recognition Stopped",
          });
        };
        newRecognition.start();
        setRecognition(newRecognition);
      } else {
        if (recognition && recognition.readyState === "listening") {
          recognition.stop();
          Swal.fire({
            icon: "info",
            title: "Speech Recognition Stopped",
          });
        } else {
          recognition.start();
          Swal.fire({
            icon: "success",
            title: "Speech Recognition Started",
          });
        }
      }
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsRecognitionOn(false);
      Swal.fire({
        icon: "info",
        title: "Speech Recognition Stopped",
      });
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

  const handlePopupClose = () => {
    setShowPopup(false);
  }

  return (
    <>
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
        <button className={styles.subButton} onClick={showAccessPopup}>Manage Access</button>
        {!isRecognitionOn && (
          <button className={styles.subButton} onClick={toggleRecognition}>Speech to text</button>
        )}
        {isRecognitionOn && (
          <button className={styles.subButton} onClick={stopRecognition}>Stop Recognition</button>
        )}
    

        <button className={`${styles.subButton} ${styles.transit}`} onClick={toggleDiscuss}>Discuss</button>
        
        <button className={styles.subButton} onClick={toggleHistory}>Track History</button>
        <button className={`${styles.subButton} ${styles.deleteButton}`}>Delete Note</button>
      </div>
      
    </div>
      {showPopup && (
        <AccessPopup
          onClose={handlePopupClose}
          noteId={noteId}
        />
      )}
      </>
  );
};

export default SubNavbar;

