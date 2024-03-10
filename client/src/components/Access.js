import React, { useState } from 'react';
import styles from "../styles/Access.module.css";
import { useCollaborator } from "../hooks/useCollaborator";

const Access = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addCollaborator } = useCollaborator();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const id = document.querySelector("#email_id");
    const name = document.querySelector("#name_id");
    try {
      await addCollaborator(id.value, name.value); // Assuming addCollaborator takes id and name as arguments
      alert("Done");
    } catch (err) {
      console.log(err);
    }

   
  };

  return (
    <>
      <button className={styles.openbutton} onClick={openForm}>
        Add Collaborators
      </button>

      {isFormOpen && (
        <div className={styles.formpopup}>
          <form action="/action_page.php" className={styles.formcontainer}>
            <h1>Add Collaborator</h1>

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input type="text" placeholder="Enter Email" name="email" id="email_id" required />
            
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input type="text" placeholder="Enter name of note" name="name" id="name_id" required />
            
            <button type="submit" className={styles.btn} onClick={handleClick}>
              Add
            </button>
            
            <button type="button" className="btn cancel" onClick={closeForm}>
               Close
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Access;
