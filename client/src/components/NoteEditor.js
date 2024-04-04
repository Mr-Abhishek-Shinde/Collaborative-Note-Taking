import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";

// Registering the rich text type to make sharedb work
// with our quill editor
Sharedb.types.register(richText.type);

const NoteEditor = ({ user, data, extractedText, isSpeech }) => {
  const { noteId } = useParams();
  const [dataNew, setDataNew] = useState();
  const menuRef = useRef(null); // Reference to the contextual menu
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
    const socket = new WebSocket(`ws://10.1.85.125:8080/${noteId}`);
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
      let quill = new Quill("#editor", options);
      editorRef.current = quill;

      /**
       * On Initialising if data is present in server
       * Updating its content to editor
       */
      if (dataNew) {
        quill.setContents(dataNew.data.content);
      } else {
        quill.setContents(doc.data);
      }

      /**
       * On Text change publishing to our server
       * so that it can be broadcasted to all other clients
       */
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
            const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
            message = quill.getText(range.index, range.length);
            console.log("User has highlighted", message);
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

      /** listening to changes in the document
       * that is coming from our server
       */
      doc.on("op", function (op, source) {
        if (source === quill) return;
        if (source === "api") {
          quill.setContents(op);
          return;
        }
        quill.updateContents(op);
      });
    });

    return () => {
      connection.close();
    };
  }, [dataNew, noteId]);

  const handleSaveNote = () => {
    const editor = editorRef.current;
    if (editor) {
      const content = editor.getContents();

      // Prompt the user for the title
      const title = prompt("Enter the title for the note:");
      if (title !== null && title.trim() !== "") {
        // If the user provides a title, proceed with saving the note
        axios
          .put("http://localhost:4000/api/note/updateNote/" + noteId, {
            title,
            content,
            username: user.username,
          })
          .then((response) => {
            console.log(response.data.message);
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
  }, [extractedText]);

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

  function handleLogFormattedText() {
    // Log the formatted text or perform any other operation
    const editor = editorRef.current;
    if (editor) {
      const formattedText = editor.root.innerHTML;
      console.log(formattedText);
      // Here you can store the formatted text in the database or perform any other operation.
    }
  }

  return (
    <div style={{ margin: "5%", border: "1px solid", fontFamily: "Arial, sans-serif" }}>
      <div id="editor" style={{ marginBottom: "20px", fontSize: "16px", color: "#333" }}></div>
      {/* Contextual menu */}
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
        {/* Add more options as needed */}
      </div>

      <button onClick={handleSaveNote}>Save Note</button>
    </div>
  );
};

export default NoteEditor;
