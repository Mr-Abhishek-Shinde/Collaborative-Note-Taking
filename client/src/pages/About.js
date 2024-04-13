import React from "react";
import styles from '../styles/About.module.css';
//import Carousel from 'react-bootstrap/Carousel';
import Slider from '../components/Slider'
// import imgAbt from '../image/about_1.jpg';
import imgMainAbt from '../image/aboutMain.jpg';
import imgAbt2 from '../image/about2.png';


const About =() => {
    const featureArray = [
        {feature: "Note Creation", description: "Allows users to create new notes easily within the application."},
        {feature: "Note Sharing: Collaboration", description: "Enables users to share their notes with others, facilitating collaborative editing and real-time updates."},
        {feature: "To-Do List", description: "Enables users to create and manage to-do lists, helping them keep track of tasks and prioritize activities effectively."}
    ];
    

    const factsArray =[
        {
            title: "AI Summarization",
            info: "CollabNote integrates AI technology to summarize text, making it easier for users to grasp key points and insights from their notes."
        },
        {
            title: "Speech-to-Text and Text-to-Speech",
            info: "With CollabNote, users can effortlessly convert spoken words into text and vice versa, enhancing accessibility and productivity in note-taking."
        },
        {
            title: "Discussion Among Notes",
            info: "CollabNote allows users to engage in discussions directly within their notes, facilitating collaboration and brainstorming among team members."
        },
        {
            title: "Notes History and Version Control",
            info: "CollabNote keeps track of notes history and provides version control, allowing users to revert to previous versions and track changes over time."
        }
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
                                Welcome to CollabNote – your all-in-one hub for seamless collaborative note taking! With CollabNote, create, edit, and organize notes in real-time, ensuring everyone stays on the same page. Say goodbye to juggling multiple documents  CollabNote keeps everything centralized and accessible, fostering greater productivity. Join us today and unlock the full potential of collaborative note taking.                       
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
                    <div className={styles.aboutus_box_titles}>
                            <Slider />
                    </div>
                    <div className={styles.aboutus_box_founder}>
                        <h2>Features</h2>
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

                    

                </div>
                
                <div className={styles.aboutus_box_titles}>
                    <h2>
                        You also get
                    </h2>
                    <p>
                        CollabNote offers a comprehensive set of powerful features designed to enhance your collaborative note-taking experience. Our platform facilitates seamless teamwork and boosts productivity by providing innovative tools such as AI Summarization of Text, Speech-to-Text and Vice Versa Conversion, Discussion Among Notes, and Notes History/Version Tracking. 
                        <br></br>
                        Join our community today and discover the full potential of collaborative note-taking with CollabNote – where ideas converge, creativity flourishes, and teamwork thrives!
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
