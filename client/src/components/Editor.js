import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

const Editor = ({ initialData, onChange, editorblock, socket }) => {
  const ref = useRef();

  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,

        tools: EDITOR_JS_TOOLS,
        data: initialData,
        async onChange(api, event) {
          const newData = await api.saver.save();
          socket.emit("data-change", newData);
          onChange(newData);
        },
      });
      ref.current = editor;

      // Register for data updates from server
      socket.on("update-data", (newData) => {
        if (ref.current && ref.current.render) {
          ref.current.render(newData);
        }
      });
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        // ref.current.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);
  return <div id={editorblock} />;
};

export default Editor;