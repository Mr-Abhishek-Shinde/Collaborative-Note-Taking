import React, { useState } from "react";
import Editor from "../components/Editor";

// Import socket.io-client
import io from "socket.io-client";

// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Start Typing...",
        level: 1,
      },
    },
  ],
};

const Notes = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const socket = io('http://localhost:5000'); // Connect to server

  return (
    <div className="editor">
      <Editor data={data} onChange={setData} editorblock="editorjs-container" socket={socket}/>
      <button
        className="savebtn"
        onClick={() => {
          alert(JSON.stringify(data));
        }}
      >
        Save
      </button>
    </div>
  );
}

export default Notes;
