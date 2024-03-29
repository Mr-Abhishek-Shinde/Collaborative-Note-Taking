import React from "react";
import Swal from "sweetalert2";

const SubNavbar = ({ handleAccess }) => {
  const showAccessForm = async () => {
    const { value: username } = await Swal.fire({
      title: "Add New Collaborator",
      input: "text",
      inputLabel: "Username",
      inputPlaceholder: "Enter the username of collaborator",
    });
    if (username) {
      handleAccess(username);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <button onClick={showAccessForm}>Give Access</button>
    </div>
  );
};

export default SubNavbar;
