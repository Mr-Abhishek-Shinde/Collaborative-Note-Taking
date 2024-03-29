import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Sharedb from 'sharedb/lib/client';
import richText from 'rich-text';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// Registering the rich text type to make sharedb work
// with our quill editor
Sharedb.types.register(richText.type);

// Connecting to our socket server
const socket = new WebSocket('ws://localhost:8080');
const connection = new Sharedb.Connection(socket);

// Querying for our document
const doc = connection.get('documents', 'firstDocument');

function App() {
  
  const editorRef = useRef(null);
  const menuRef = useRef(null); // Reference to the contextual menu
  let messgae = '';

  
  useEffect(() => {
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
        ],
      },
    });

    
    editorRef.current = quill;

    quill.on('selection-change', (range, oldRange, source) => {
      const menu = menuRef.current;

      if (!menu) return;

      if (range) {
        if (range.length > 0) {
          // If text is selected, display the menu at the selection position
          const selection = window.getSelection();
          const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
          messgae = quill.getText(range.index, range.length);
          console.log('User has highlighted', messgae);
          menu.style.display = 'block';
          menu.style.top = `${selectionRect.bottom}px`;
        menu.style.left = `${selectionRect.left}px`;

        } else {
          // If no text is selected, hide the menu
          menu.style.display = 'none';
        }
      } else {
        // If cursor is not in the editor, hide the menu
        menu.style.display = 'none';
      }
    });
  }, []);

  function handleSummary() {
    // Perform the action of summarizing the selected text
    console.log('Summary option clicked');
    const msg = new SpeechSynthesisUtterance()
    msg.text = messgae;
    window.speechSynthesis.speak(msg)
  }

  function handleTransformation() {
    // Perform the action of transforming the selected text
    console.log('Transformation option clicked');
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
    <div style={{ margin: '5%', border: '1px solid', fontFamily: 'Arial, sans-serif' }}>
      <div id='editor' style={{ marginBottom: '20px', fontSize: '16px', color: '#333' }}></div>
      {/* Contextual menu */}
      <div ref={menuRef} style={{ position: 'absolute', display: 'none', border: '2px solid black', padding: '5px', backgroundColor: 'white', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}>
        <button style={{ marginRight: '5px', cursor: 'pointer', border: 'none', backgroundColor: 'white',borderRight: '1px', color: 'black', padding: '5px 10px', fontFamily: 'Times New Roman", Times, serif' }} onClick={handleSummary}>Read aloud</button>
        <button style={{ cursor: 'pointer', border: 'none', backgroundColor: 'white', borderRight: '1px',color: 'black', padding: '5px 10px',fontFamily: 'Times New Roman", Times, serif' }} onClick={handleTransformation}>Summarize text</button>
        {/* Add more options as needed */}
      </div>
      <button style={{ cursor: 'pointer', border: 'none', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '5px', fontFamily: 'Arial, sans-serif' }} onClick={handleLogFormattedText}>Log Formatted Text</button>
    </div>
  );
}

export default App;