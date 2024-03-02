import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogoutClick = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-heading"]}>
        <h1>CollabNote</h1>
      </div>
      <ul>
        <li>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn} onClick={toggleDropdown}>
             +
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdowncontent}>
                <a href="#">Give access</a>
                <a href="#">New note</a>
                <a href="#">Add Comments</a>
              </div>
            )}
          </div>
        </li>
        <li className={styles["home-icon"]}>
          <Link to="/">
            <svg
              style={{ cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
            </svg>
          </Link>
        </li>
        {user && (
          <li>
            <button className="logout-button" onClick={handleLogoutClick}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
