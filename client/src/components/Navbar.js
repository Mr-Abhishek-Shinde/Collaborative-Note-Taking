import React from 'react'
import styles from '../styles/Navbar.module.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles['navbar']}>
        <div><h1>Collaborative Note Taking</h1></div>
        <ul>
            <li><Link to="/">Home</Link></li>
        </ul>
    </div>
  )
}

export default Navbar