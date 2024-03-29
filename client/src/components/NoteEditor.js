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

// Connecting to our socket server
const socket = new WebSocket("ws://127.0.0.1:8080");
const connection = new Sharedb.Connection(socket);

// Querying for our document
const doc = connection.get("documents", "firstDocument");

const NoteEditor = ({ user, data }) => {
  const { noteId } = useParams();
  const [dataNew, setDataNew] = useState()

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
  }, [noteId])
  

  const editorRef = useRef(null);

  useEffect(() => {
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

      // const ops = await handleRetrieveNotes();
      // quill.setContents(ops);
      // // doc.submitOp(ops, { source: "api" });
      // handleRetrieveNotes()
      
    });

    return () => {
      // connection.close();
    };
  }, [dataNew]);

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
  

  // const handleRetrieveNotes = () => {
  //   axios
  //     .get("http://localhost:4000/api/note/getNote/6605be66bcf4c38a74fc5346")
  //     .then((response) => {
  //       const notes = response.data;
  //       const editor = editorRef.current;
  //       if (editor) {
  //         const contentDelta = notes.content;
  //         editor.setContents(contentDelta.ops);
  //         return contentDelta.ops;
  //         // doc.submitOp(contentDelta.ops, { source: "api" });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving notes:", error);
  //     });
  // };

  return (
    <div style={{ margin: "5%", border: "1px solid" }}>
      <div id="editor"></div>
      <button onClick={handleSaveNote}>Save Note</button>
    </div>
  );
}

export default NoteEditor;
