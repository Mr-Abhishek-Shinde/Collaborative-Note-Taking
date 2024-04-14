import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AccessPopup from "./AccessPopup";
import styles from "../styles/Notes.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const SubNavbar = ({
  setExtractedText,
  setisSpeech,
  toggleDiscuss,
  toggleHistory,
  openSideNav,
  noteId,
  isSharedNote,
}) => {
  const { user } = useAuthContext();

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
  };

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

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const goToDashboard = () => {
    window.location.href = "/notes/";
  };

  const handleDeleteNote = async (noteId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#28a745",
      cancelButtonText: "No, cancel!",
      cancelButtonColor: "#dc3545",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:4000/api/note/deleteNote/${noteId}`,
          {
            data: {
              username: user.username,
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Note Deleted Successfully!",
        });
        window.location.href = "/notes/";
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Oops!",
          text: error.response.data.error,
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div className={styles.subnavbar}>
        <div className={styles.subnavbarLeft}>
          <div id={styles.lines} onClick={openSideNav}>
            &#9776;
          </div>
        </div>
        <div className={styles.subnavbarRight}>
          <button className={styles.subButton} onClick={showAccessPopup}>
            Manage Access
          </button>

          {!isRecognitionOn && (
            <button className={styles.subButton} onClick={toggleRecognition}>
              Speech to text
            </button>
          )}

          {isRecognitionOn && (
            <button className={styles.subButton} onClick={stopRecognition}>
              Stop Recognition
            </button>
          )}

          <button className={styles.subButton} onClick={toggleDiscuss}>
            Discuss
          </button>

          <button className={styles.subButton} onClick={toggleHistory}>
            Track History
          </button>

          <button
            className={`${styles.subButton} ${styles.backButton}`}
            onClick={goToDashboard}
          >
            Go Back
          </button>

          <button
            className={`${styles.subButton} ${styles.deleteButton}`}
            onClick={() => handleDeleteNote(noteId)}
          >
            Delete Note
          </button>
        </div>
      </div>

      {showPopup && <AccessPopup onClose={handlePopupClose} noteId={noteId} />}
    </>
  );
};

export default SubNavbar;
