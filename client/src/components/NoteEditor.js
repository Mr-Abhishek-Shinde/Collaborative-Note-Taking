import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";
import Swal from "sweetalert2";

// Registering the rich text type to make sharedb work
// with our quill editor
Sharedb.types.register(richText.type);

const NoteEditor = ({ user, extractedText, isSpeech }) => {
  const { noteId } = useParams();
  const [dataNew, setDataNew] = useState();
  const menuRef = useRef(null);
  let message = "";

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/note/getNote/" + noteId)
      .then((response) => {
        const notes = response;
        setDataNew(notes);
      })
      .catch((error) => {
        console.error("Error retrieving notes:", error);
      });
  }, [noteId]);

  const editorRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/${noteId}`);
    const connection = new Sharedb.Connection(socket);
    const doc = connection.get("documents", noteId);

    doc.subscribe(async function (err) {
      if (err) throw err;

      const options = {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"],
          ],
        },
      };
      
      if(dataNew){
        let quill = new Quill("#editor", options);
      editorRef.current = quill;

      if (dataNew) {
        quill.setContents(dataNew.data.content);
      } else {
        quill.setContents(doc.data);
      }

      quill.on("text-change", function (delta, oldDelta, source) {
        if (source !== "user") return;
        doc.submitOp(delta, { source: quill });
      });

      quill.on("selection-change", (range, oldRange, source) => {
        const menu = menuRef.current;

        if (!menu) return;

        if (range) {
          if (range.length > 0) {
            // If text is selected, display the menu at the selection position
            const selection = window.getSelection();
            const selectionRect = selection
              .getRangeAt(0)
              .getBoundingClientRect();
            // message = quill.getText(range.index, range.length);
            // console.log("User has highlighted", message);
            menu.style.display = "block";
            menu.style.top = `${selectionRect.bottom}px`;
            menu.style.left = `${selectionRect.left}px`;
          } else {
            // If no text is selected, hide the menu
            menu.style.display = "none";
          }
        } else {
          // If cursor is not in the editor, hide the menu
          menu.style.display = "none";
        }
      });

      doc.on("op", function (op, source) {
        if (source === quill) return;
        if (source === "api") {
          quill.setContents(op);
          return;
        }
        quill.updateContents(op);
      });
      }
    });

    return () => {
      connection.close();
    };
  }, [dataNew, noteId]);

  const handleSaveNote = async () => {
    const editor = editorRef.current;
    if (editor) {
      const content = editor.getContents();

      // Using SweetAlert to prompt the user for the title
      const { value: title } = await Swal.fire({
        title: "Enter the title for the note:",
        input: "text",
        inputPlaceholder: "Enter title",
        inputValue: "", // Optional: Provide default value
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value.trim()) {
            return "Title cannot be empty";
          }
        },
      });

      if (title !== undefined) {
        // If the user provides a title, proceed with saving the note
        axios
          .put("http://localhost:4000/api/note/updateNote/" + noteId, {
            title,
            content,
            username: user.username,
          })
          .then((response) => {
            Swal.fire({
              title: "Note Saved!",
              timer: 1000,
              timerProgressBar: true,
            })
          })
          .catch((error) => {
            console.error("Error saving note:", error);
          });
      } else {
        // If the user cancels or provides an empty title, do nothing
        console.log("No title provided. Note not saved.");
      }
    }
  };

  useEffect(() => {
    // Insert extracted text into the editor when available
    if (extractedText && isSpeech && editorRef.current) {
      editorRef.current.clipboard.dangerouslyPasteHTML(extractedText);
    }
  }, [extractedText, isSpeech]);

  function handleSummary() {
    // Perform the action of summarizing the selected text
    console.log("Summary option clicked");
    const msg = new SpeechSynthesisUtterance();
    msg.text = message;
    window.speechSynthesis.speak(msg);
  }

  function handleTransformation() {
    // Perform the action of transforming the selected text
    console.log("Transformation option clicked");
  }

  // function handleLogFormattedText() {
  //   const editor = editorRef.current;
  //   if (editor) {
  //     const formattedText = editor.root.innerHTML;
  //     console.log(formattedText);
  //   }
  // }

  return (
    <div
      style={{
        margin: "5%",
        border: "1px solid",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        id="editor"
        style={{ marginBottom: "20px", fontSize: "16px", color: "#333" }}
      ></div>
      <div
        ref={menuRef}
        style={{
          position: "absolute",
          display: "none",
          border: "2px solid black",
          padding: "5px",
          backgroundColor: "white",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
        }}
      >
        <button
          style={{
            marginRight: "5px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "white",
            borderRight: "1px",
            color: "black",
            padding: "5px 10px",
            fontFamily: 'Times New Roman", Times, serif',
          }}
          onClick={handleSummary}
        >
          Read aloud
        </button>
        <button
          style={{
            cursor: "pointer",
            border: "none",
            backgroundColor: "white",
            borderRight: "1px",
            color: "black",
            padding: "5px 10px",
            fontFamily: 'Times New Roman", Times, serif',
          }}
          onClick={handleTransformation}
        >
          Summarize text
        </button>
      </div>

      <button onClick={handleSaveNote}>Save Note</button>
    </div>
  );
};

export default NoteEditor;
