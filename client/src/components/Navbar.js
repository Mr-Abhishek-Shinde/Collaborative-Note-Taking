import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className={styles["navbar"]}>
      <div>
        <h1>Collaborative Note Taking</h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && <li>
          <button className="logout-button" onClick={handleLogoutClick}>
            Log Out
          </button>
        </li>}
      </ul>
    </div>
    
  );
};

export default Navbar;
