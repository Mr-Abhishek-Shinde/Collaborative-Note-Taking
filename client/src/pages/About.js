import React from "react";
import styles from '../styles/About.module.css';

// import imgAbt from '../image/about_1.jpg';
import imgMainAbt from '../image/aboutMain.jpg';
import imgAbt2 from '../image/about2.png';

const About =() => {
    const featureArray = [
        {feature: "Note Creation", description: "Allows users to create new notes easily within the application."},
        {feature: "Note Sharing: Collaboration", description: "Enables users to share their notes with others, facilitating collaborative editing and real-time updates."},
        {feature: "Speech-to-Text", description: "Converts spoken words into text, providing a convenient way for users to input content using voice commands."},
        {feature: "Mind Map", description: "Provides tools for creating visual representations of ideas and concepts, helping users organize and connect thoughts effectively."}
    ];
    

    const factsArray =[
        {
            title: "Real-Time Collaboration",
            info: "CollabNote allows users to collaborate in real-time on notes, enabling seamless teamwork and idea sharing."
        },
        {
            title: "Organized Note-Taking",
            info: "With CollabNote, users can effortlessly create, edit, and organize notes, ensuring all information is easily accessible and well-structured."
        },
        
        {
            title: "Speech-to-Text Conversion",
           info: "CollabNote features built-in speech-to-text functionality, enabling users to dictate their notes using voice commands. This feature enhances productivity and accessibility, allowing users to create and edit notes hands-free."
        },
    ];
    return (
        <div className={styles.aboutus}>
            <div className={styles.mainImg}>
                    <img src={imgMainAbt} alt="main" className={styles.fullScreenImg}></img>
                    <div className={styles.overlayText}>About Us</div>
            </div>
            <div className={styles.aboutus_box}>
                <div className={styles.bgcolor_hero}>
                
                    <div className={styles.aboutus_box_hero}>
                        <div className={styles.aboutus_box_hero_left}>
                            <h1> About Us.</h1>
                            <p>
                                Welcome to CollabNote – your all-in-one hub for seamless collaborative note-taking! With CollabNote, create, edit, and organize notes in real-time, ensuring everyone stays on the same page. Say goodbye to juggling multiple documents – CollabNote keeps everything centralized and accessible, fostering greater productivity. Join us today and unlock the full potential of collaborative note-taking.                       
                            </p>
                            <p>
                                At CollabNote, we believe in the power of collaboration to drive innovation. Welcome to a space where ideas converge, creativity flourishes, and teamwork thrives! Experience seamless exchange, dynamic brainstorming, and project realization. Join us on this journey of productivity and innovation!
                            </p>
                        </div>
                        <div className={styles.aboutus_box_hero_right}>
                            <img src={imgAbt2} alt="about" />
                        </div>
                    </div>

                </div>

                <div className={styles.aboutus_founder}>
                    
                    <div className={styles.aboutus_box_founder}>
                        <div className={styles.aboutus_box_founder_box}>
                            {featureArray.map((el, i)=>(
                                <div className={styles.aboutus_box_founder_box_item} key={i}>
                                    <h3>
                                        {el.feature}
                                    </h3>
                                    <p>
                                        {el.description}
                                    </p>
                                </div>
                            )
                            )}
                        </div>
                    </div>

                    <div className={styles.aboutus_box_titles}>
                        <h2>
                            Feature
                        </h2>
                        <p>
                        Welcome to CollabNote – your all-in-one hub for seamless collaborative note-taking! Our platform revolutionizes the way teams and individuals collaborate on ideas, projects, and tasks. With CollabNote, effortlessly create, edit, and organize notes in real-time, ensuring everyone stays on the same page. Say goodbye to juggling multiple documents – CollabNote keeps everything centralized and accessible, fostering greater productivity. Join our community today and unlock the full potential of collaborative note-taking. Welcome to CollabNote – where ideas converge, creativity flourishes, and teamwork thrives!
                        </p>
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
