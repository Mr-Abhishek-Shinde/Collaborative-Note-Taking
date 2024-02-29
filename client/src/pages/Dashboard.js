import React from 'react'
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {

  
  const openNav = () => {
    const sidenav = document.getElementById("mainSideNav");
    if (sidenav) {
      sidenav.style.width = "250px";
    }
    else{
      alert("Not found");
    }
  };


const closeNav = () => {
  const sidenav = document.getElementById("mainSideNav");
  if (sidenav) {
    sidenav.style.width = "0";
  }
};

  return (
    <>
    <div className={styles.main}>
        <div id="mainSideNav" className={styles.sidenav}>
          <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>&times;</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>
        <span id={styles.lines}
          
          onClick={openNav}
        >
          &#9776;
        </span>
  <ul className={styles.cards}>
    <li className={styles.cards_item}>
      <div className={styles.card}>
        <div className={styles.card_img}><img src=""/></div>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>Notes</h2>
          <p className={styles.card_text}>Demo of pixel perfect pure CSS simple responsive card grid layout</p>
          <button className={styles.btn}>Read More</button>
        </div>
      </div>
    </li>
    <li className={styles.cards_item}>
      <div className={styles.card}>
        <div className={styles.card_img}><img src=""/></div>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>To-do List</h2>
          <p className={styles.card_text}>Demo of pixel perfect pure CSS simple responsive card grid layout</p>
          <button className={styles.btn}>Read More</button>
        </div>
      </div>
    </li>
    <li className={styles.cards_item}>
      <div className={styles.card}>
        <div className={styles.card_img}><img src=""/></div>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>Mind-Map</h2>
          <p className={styles.card_text}>Demo of pixel perfect pure CSS simple responsive card grid layout</p>
          <button className={styles.btn}>Read More</button>
        </div>
      </div>
    </li>
    
  </ul>
</div>
    </>
    
  )
}

export default Dashboard