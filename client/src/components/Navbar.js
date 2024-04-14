import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 960);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      {!isSmallScreen && (
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
            <Link to="/dashboard">
              {/* <i className="fa-solid fa-address-book"></i> */}
              <i className="fa-solid fa-table-columns"></i>
              Dashboard
            </Link>
          </li>

          {user && (
            <li>
              <button className={styles.logoutButton} onClick={handleLogoutClick}>
                Log Out
              </button>
            </li>
          )}
        </ul>
      )}

      {isSmallScreen && (
        <div className={styles.dropdown}>
          
          <button className={styles.dropbtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <i className="fa-solid fa-grip-lines"></i>
          </button>
          {dropdownOpen && (
            <div className={styles.dropdowncontent}>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/dashboard">Dashboard</Link>
              {user && (
                <button className={styles.logoutButton} onClick={handleLogoutClick}>
                  Log Out
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
