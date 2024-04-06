import { React, useEffect, useState } from "react";
import styles from "../styles/Popup.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const AccessPopup = ({ onClose, noteId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const showCollaboratorModal = async (type) => {
    console.log(type === "add");
    const { value: username } = await Swal.fire({
      title: `${type === "add" ? "Add New" : "Remove"} Collaborator`,
      input: "text",
      inputLabel: "Username",
      inputPlaceholder: "Enter username of the collaborator",
    });
    if (username) {
      if (type === "add") {
        addCollaborator(username);
      } else {
        removeCollaborator(username);
      }
    }
  };

  const addCollaborator = (username) => {
    axios
      .post("http://localhost:4000/api/note/addCollaborator/" + noteId, {
        username: username,
      })
      .then((response) => {
        console.log(response.data.message);
        fetchCollaborators();
      })
      .catch((error) => {
        console.error("Error Adding Collaborator:", error);
      });
  };

  const removeCollaborator = (username) => {
    axios
      .delete("http://localhost:4000/api/note/removeCollaborator/" + noteId, {
        data: { username: username },
      })
      .then((response) => {
        console.log(response.data.message);
        fetchCollaborators();
      })
      .catch((error) => {
        console.error("Error Removing Collaborator:", error);
      });
  };

  const fetchCollaborators = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/note/getCollaborators/${noteId}`
      );
      setCollaborators(response.data.collaborators);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  useEffect(() => {
    fetchCollaborators();
    // eslint-disable-next-line
  }, [noteId]);

  return (
    isVisible && (
      <div className={styles.outerContainer}>
        <div className={styles.popupContainer}>
          <>
            <button className={styles.closeBtn} onClick={handleClose}>
              &#10006;
            </button>
            <div className={styles.popupContent}>
              <div className={styles.title}>
                <h1>Manage Note Access</h1>
                <button onClick={() => showCollaboratorModal("add")}>
                  Add Collaborator
                </button>
                <button onClick={() => showCollaboratorModal("remove")}>
                  Remove Collaborator
                </button>
              </div>
              {isLoading ? (
                <h4>Loading...</h4>
              ) : collaborators ? (
                <div className={styles.collaboratorsList}>
                  <h2>Collaborators:</h2>
                  <ul>
                    {collaborators.map((collaborator, index) => (
                      <li key={index}>
                        <p>Email: {collaborator.email}</p>
                        <p>Username: {collaborator.username}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <h4>No Collaborators added yet!</h4>
              )}
            </div>
          </>
        </div>
      </div>
    )
  );
};

export default AccessPopup;
