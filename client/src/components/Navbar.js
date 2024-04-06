import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Confirm?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Logged out!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navbarHeading}>
        CollabNote
      </Link>

      <ul className={styles.linkref}>
        <li className={styles.navLink}>
          <Link to="/">
            <i className="fa-sharp fa-solid fa-house-user"></i>
            Home
          </Link>
        </li>
        <li className={styles.navLink}>
          <Link to="/about">
            <i className="fa-solid fa-circle-info"></i>
            AboutUs
          </Link>
        </li>
        <li className={styles.navLink}>
          <Link to="/">
            <i className="fa-solid fa-address-book"></i>
            Contacts
          </Link>
        </li>

        {/* {user && (
          <li className={styles.navLink} ref={dropdownRef}>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn} onClick={toggleDropdown}>
                <h3 className={styles.plus}>+</h3>
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdowncontent}>
                  <Link>New note</Link>
                  <Link>Add Comments</Link>
                </div>
              )}
            </div>
          </li>
        )} */}
        {user && (
          <li>
            <button className={styles.logoutButton} onClick={handleLogoutClick}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
