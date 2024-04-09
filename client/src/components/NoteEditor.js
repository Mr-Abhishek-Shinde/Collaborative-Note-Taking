import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";
import { pipeline,AutoTokenizer } from '@xenova/transformers';
import { useSummarizeText } from '../hooks/useSummarizeText';


// Registering the rich text type to make sharedb work
// with our quill editor
Sharedb.types.register(richText.type);

const NoteEditor = ({ user, data, extractedText, isSpeech }) => {
  const { noteId } = useParams();
  const [dataNew, setDataNew] = useState();
  const menuRef = useRef(null); // Reference to the contextual menu
  const [summary, setSummary] = useState("");
  const { summarizeText, isLoading } = useSummarizeText();
  let message = "";
  const [displaySummary, setDisplaySummary] = useState(false);

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
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      if (selection && selection.length > 0) {
        // If text is selected, update the message variable
        message = editor.getText(selection.index, selection.length);
        console.log("User has highlighted", message);
      }
      const msg = new SpeechSynthesisUtterance();
      msg.text = message;
      window.speechSynthesis.speak(msg);
    }
  }
  

  
  async function handleSummarization() {
    try {
      
      await summarizeText(message);
      const summarizedArticleJson = localStorage.getItem('summarizedArticle');
      const summarizedArticle = JSON.parse(summarizedArticleJson);
  
      const summaryText = summarizedArticle[0]?.summary_text;
  
      
      console.log("Extracted Summary Text:", summaryText);
      setSummary(summaryText); // Store the summary text in the state variable
      setDisplaySummary(true);
    } catch (error) {
      console.error("Error occurred during summarization:", error);
    }
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
          onClick={handleSummarization}
        >
          Summarize text
        </button>
       {/* Add more options as needed */}
      {/* Add more options as needed */}
{displaySummary && summary && (
  <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
    <h3>Summary</h3>
    <p>{summary}</p>
    <button onClick={() => setDisplaySummary(false)} style={{ cursor: "pointer", float: "right" }}>Close</button>
  </div>
)}


      </div>

      <button onClick={handleSaveNote}>Save Note</button>
    </div>
  );
};

export default NoteEditor;
