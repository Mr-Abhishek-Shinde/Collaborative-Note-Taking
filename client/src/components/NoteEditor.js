import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";
import Swal from "sweetalert2";
import styles from "../styles/Notes.module.css";

import generatePDF from 'react-to-pdf';


// Registering the rich text type to make sharedb work
// with our quill editor
Sharedb.types.register(richText.type);

const NoteEditor = ({ user, extractedText, isSpeech }) => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState();
  const [noteTitle, setNoteTitle] = useState();
  const menuRef = useRef(null);
  const [summary, setSummary] = useState("");
  const [article, setarticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const targetRef = useRef();
  const [displaySummary, setDisplaySummary] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/note/getNote/" + noteId)
      .then((response) => {
        const notes = response.data;
        setNoteData(notes.versions[notes.versions.length - 1]);
        setNoteTitle(notes.title)
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
      // if (err) throw err;
      

      const options = {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", { 'color': [] }, { 'background': [] },"strike", { script: "sub" }, { script: "super" }, "link",[{ 'blockquote': 'blockquote' }]],
            
            
            [{ list: 'ordered' }, { list: 'bullet' },{ 'align': [] }, "code-block", { 'indent': '-1' }, { 'indent': '+1' },{ 'direction': 'rtl' }],

            ["image"],
            

          ],
        },
      };
      
      
      
      
      if(noteData){
        let quill = new Quill("#editor", options);
      editorRef.current = quill;

      if (noteData) {
        quill.setContents(noteData.content);
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
            updatearticle();
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
  }, [noteData, noteId]);

  const updatearticle = () => {
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      if (selection && selection.length > 0) {
        // If text is selected, update the article state
        let text = "";
        text = editor.getText(selection.index, selection.length);
        setarticle(text);
        console.log("Selected text:", text);
      }
    }
  };

  const handleSaveNote = async () => {
    const editor = editorRef.current;
    if (editor) {
      const content = editor.getContents();

      const { value: details } = await Swal.fire({
        title: "Enter the title for the note:",
        html:
        '<label for="swal-input-title">Title:</label>' +
        '<input id="swal-input-title" class="swal2-input" placeholder="Enter title" value="' + noteTitle + '">' +
        '<label for="swal-input-message">Message:</label>' +
        '<input id="swal-input-message" class="swal2-input" placeholder="Enter update message" value="Updated Note">'
        ,
        focusConfirm: false,
        preConfirm: () => {
          const titleInput = document.getElementById("swal-input-title").value;
          const messageInput = document.getElementById("swal-input-message").value;
          
          if (!titleInput.trim()) {
            Swal.showValidationMessage("Title cannot be empty");
            return false;
          }
      
          return { title: titleInput, message: messageInput };
        },
        showCancelButton: true,
      });

      if (details !== undefined) {
        axios
          .put("http://localhost:4000/api/note/updateNote/" + noteId, {
            title: details.title,
            content,
            updateMessage: details.message,
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
    const editor = editorRef.current;
    if (editor) {
      // const selection = editor.getSelection();
      // if (selection && selection.length > 0) {
      //   // If text is selected, update the message variable
      //   let text="";
      //   text = editor.getText(selection.index, selection.length);
      //   setarticle(text);
      //   console.log("User has highlighted", text);
      //   console.log("User has highlighted", article);
      // }
      const msg = new SpeechSynthesisUtterance();
      msg.text = article;
      window.speechSynthesis.speak(msg);
    }
  }

  
  const handleSummarization = async () => {
    console.log(article)
    try {
       setIsLoading(true); // Assuming you have setIsLoading from useState()
  
      const response = await fetch('http://127.0.0.1:4000/api/summarize/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article }), // Accessing article directly
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Server Result:", result);
        localStorage.setItem('summarizedArticle', JSON.stringify(result.summarizedArticle));
        setSummary(result.summarizedArticle[0]?.summary_text);
        setDisplaySummary(true);
        Swal.fire({
          text: "Article Summarized Successfully!",
          icon: "success",
        });
      } else {
        const json = await response.json();
        console.error("Server Error:", json);
        throw new Error(json.error);
      }
    } catch (error) {
      console.error("An error occurred during summarization:", error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    } finally {
       setIsLoading(false);
    }
  };
  
  const handleDownloadNote = () => {
    
        generatePDF(targetRef, {filename: 'page.pdf'})}
    

  // function handleLogFormattedText() {
  //   const editor = editorRef.current;
  //   if (editor) {
  //     const formattedText = editor.root.innerHTML;
  //     console.log(formattedText);
  //   }
  // }

  return (
    <div  className={styles.editorContainer} //full
      style={{
        border: "1px solid",
        fontFamily: "Arial, sans-serif",
        
      }}
    >
      <div ref={targetRef} className={styles.editNotesContainer}
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
            backgroundColor: "#c9eaf8",
            borderRight: "1px",
            borderRadius: "5px",
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
            backgroundColor: "#c9eaf8",
            borderRight: "1px",
            borderRadius: "5px",
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
      {isLoading && (
  <div style={{ textAlign: 'center', marginTop: '10px', color: '#666', fontStyle: 'italic' }}>
    Please wait...
  </div>
)}

      {displaySummary && summary && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Summary</h3>
          <p>{summary}</p>
          <button onClick={() => 
            setDisplaySummary(false)} 
            style=
            {{  cursor: "pointer", 
                float: "right" ,
                position: "absolute",
                display: "none",
                border: "2px solid black",
                padding: "5px",
                backgroundColor: "white",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
            }}>
            Close</button>
        </div>
      )}
      </div>
      <div className={styles.editorButtons}>
        <div className={styles.saveNote}>
          <button className={styles.saveNoteButton} onClick={handleSaveNote}>Save Note</button>
        </div>
        <div className={styles.saveNote}>
        <button className={styles.saveNoteButton} onClick={handleDownloadNote}>Download Note</button>
        </div>
      </div>

    </div>
  );
};

export default NoteEditor;