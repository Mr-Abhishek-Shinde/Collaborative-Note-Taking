import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom"; // Import Link
import Swal from "sweetalert2";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  
  // const [clicked, setClicked] = useState(false);
  // const handleClick = () => {
  //   setClicked(!clicked);
  // };
  
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navbarHeading}> {/* Wrap heading inside Link */}
        CollabNote
      </Link>
      
      {/* note : dont change classname for <i> tags as they are extensions */}
      {/* for responsiveness */}
      {/* <div className={styles.menuicons} onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div> */}

      <ul className={styles.linkref}>
        <li className={styles.navLink}>
          <Link to="/">
            <i class="fa-sharp fa-solid fa-house-user"></i>
            Home
          </Link>
        </li>
        <li className={styles.navLink}>
          <Link to="/">
            <i class="fa-solid fa-circle-info"></i>
            AboutUs
          </Link>
        </li> 
        <li className={styles.navLink}>
          <Link to="/">
            <i class="fa-solid fa-address-book"></i>
            Contacts
          </Link>
        </li>

        <li className={styles.navLink}>
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
