import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styles from "../styles/Popup.module.css";

const NotePopup = ({ onClose, noteData, noteVersion }) => {
  const [isVisible, setIsVisible] = useState(true);
  // eslint-disable-next-line
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (noteData) {
      const options = {
        theme: "snow",
      };
      const quill = new Quill("#editor-container", options);
      quill.setContents(noteData);
      quill.disable(); // Disable editing
      setEditor(quill);
    }
  }, [noteData]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
      <div className={styles.outerContainer}>
        <div className={styles.notePopupContainer}>
          <>
            <div className={styles.popupContent}>
              <div className={styles.title}>
                <button className={styles.closeBtn} onClick={handleClose}>
                  &#10006;
                </button>
                <h1>Note Contents</h1>
                <p>Modified At: {noteVersion.modifiedAt}</p>
                <p>Modified By: {noteVersion.modifiedBy}</p>
                <p>Update Message: {noteVersion.updateMessage}</p>
                <h4>You can't edit the older version. But you can copy-paste the contents to use it in the current version.</h4>
              </div>
              <div id="editor-container" className={styles.editorContainer}></div>
            </div>
          </>
        </div>
      </div>
    )
  );
};

export default NotePopup;
