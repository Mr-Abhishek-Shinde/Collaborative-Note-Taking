import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/About.module.css';

import imgAbt from '../image/about_1.jpg';

const About =() => {
    const founderArray = [
        {name:"Abhishek", position:"chief executive", images: imgAbt},
        {name:"Abhishek", position:"chief executive", images: imgAbt},
        {name:"Abhishek", position:"chief executive", images: imgAbt},
    ];

    const factsArray =[
        {
            title: "service 1",
            info: "this feature is used for this there is so much fun to do this"
        },
        {
            title: "service 2",
            info: "this feature is used for this there is so much fun to do this"
        },
        {
            title: "service 3",
            info: "this feature is used for this there is so much fun to do this"
        },
    ];
    return (
        <div className={styles.aboutus}>
            <div className={styles.aboutus_box}>
                <div className={styles.aboutus_box_hero}>
                    <div className={styles.aboutus_box_hero_left}>
                        <h1> About Us.</h1>
                        <p>
                        Welcome to CollabNote – your all-in-one hub for seamless collaborative note-taking! Our platform revolutionizes the way teams and individuals collaborate on ideas, projects, and tasks. With CollabNote, effortlessly create, edit, and organize notes in real-time, ensuring everyone stays on the same page. Say goodbye to juggling multiple documents – CollabNote keeps everything centralized and accessible, fostering greater productivity. Join our community today and unlock the full potential of collaborative note-taking. Welcome to CollabNote – where ideas converge, creativity flourishes, and teamwork thrives!
                        </p>
                    </div>
                    <div className={styles.aboutus_box_hero_right}>
                        <img src={imgAbt}></img>
                    </div>
                </div>

                <div className={styles.aboutus_box_titles}>
                    <h2>
                        Founder
                    </h2>
                    <p>
                    Welcome to CollabNote – your all-in-one hub for seamless collaborative note-taking! Our platform revolutionizes the way teams and individuals collaborate on ideas, projects, and tasks. With CollabNote, effortlessly create, edit, and organize notes in real-time, ensuring everyone stays on the same page. Say goodbye to juggling multiple documents – CollabNote keeps everything centralized and accessible, fostering greater productivity. Join our community today and unlock the full potential of collaborative note-taking. Welcome to CollabNote – where ideas converge, creativity flourishes, and teamwork thrives!
                    </p>
                </div>

                <div className={styles.aboutus_box_founder}>
                    <div className={styles.aboutus_box_founder_box}>
                        {founderArray.map((el, i)=>(
                            <div className={styles.aboutus_box_founder_box_img}>
                                <img 
                                    src={el.images} 
                                    alt={el.name} 
                                    width={500} 
                                    height={500} 
                                    className={styles.aboutus_box_founder_box_img_img}>
                                </img>
                                <h3>
                                    {el.name}
                                </h3>
                                <p>
                                    {el.position}
                                </p>
                            </div>
                        )
                        )}
                    </div>
                </div>
                <div className={styles.aboutus_box_titles}>
                    <h2>
                        Facts
                    </h2>
                    <p>
                        Welcome to CollabNote – your all-in-one hub for seamless collaborative note-taking! Our platform revolutionizes the way teams and individuals collaborate on ideas, projects, and tasks. With CollabNote, effortlessly create, edit, and organize notes in real-time, ensuring everyone stays on the same page. Say goodbye to juggling multiple documents – CollabNote keeps everything centralized and accessible, fostering greater productivity. Join our community today and unlock the full potential of collaborative note-taking. Welcome to CollabNote – where ideas converge, creativity flourishes, and teamwork thrives!
                    </p>
                </div>

                <div className={styles.aboutus_box_facts}>
                    <div className={styles.aboutus_box_facts_box}>
                        {factsArray.map((el,i)=>(
                            <div className={styles.aboutus_box_facts_box_info} key={i}>
                                <h3>{el.title}</h3>
                                <p>{el.info}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
        
    )

}

export default About;
