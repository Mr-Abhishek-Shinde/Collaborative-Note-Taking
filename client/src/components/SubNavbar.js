import React, { useState } from "react";
import Swal from "sweetalert2";

const SubNavbar = ({ handleAccess, setExtractedText, setisSpeech }) => {
  const [recognition, setRecognition] = useState(null);
  const [isRecognitionOn, setIsRecognitionOn] = useState(false);

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

  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <button onClick={showAccessForm}>Give Access</button>
      {!isRecognitionOn && (
        <button onClick={toggleRecognition}>Speech to text</button>
      )}
      {isRecognitionOn && (
        <button onClick={stopRecognition}>Stop Recognition</button>
      )}
    </div>
  );
};

export default SubNavbar;
