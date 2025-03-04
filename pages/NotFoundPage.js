import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./error404.module.css";

// Array of meme-based 404 messages
const memeMessages = [
  "404: Page got perfectly balanced, as all things should be.",
  "404: Page was not the chosen one.",
  "404: Page took an arrow to the knee.",
  "404: Page is in another castle.",
  "404: Page has been yeeted out of existence.",
  "404: Page was not the impostor.",
  "404: Page ran out of coffee and couldn't load.",
  "404: Page is social distancing from the server.",
  "404: Page left to get milk and never came back.",
  "404: Page was eaten by a wild 404 error.",
];

// Array of meme image URLs from Unsplash
const memeImages = [
  "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80", // Confused cat
  "https://images.unsplash.com/photo-1501820488136-72669149e0d4?auto=format&fit=crop&w=600&q=80", // Dog looking surprised
  "https://images.unsplash.com/photo-1531693251400-38df35776dc7?auto=format&fit=crop&w=600&q=80", // Monkey covering eyes
  "https://images.unsplash.com/photo-1536589961747-e239b2abbec2?auto=format&fit=crop&w=600&q=80", // Shocked face
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80", // Dramatic look
];

const NotFoundPage = ({ darkMode }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);

  // Function to get a random item from an array
  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Function to refresh meme content
  const refreshMeme = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setMessage(getRandomItem(memeMessages));
      setImage(getRandomItem(memeImages));
      setIsGlitching(false);
    }, 500);
  };

  // Set initial meme content on component mount
  useEffect(() => {
    setMessage(getRandomItem(memeMessages));
    setImage(getRandomItem(memeImages));
  }, []);

  return (
    <div className={`${styles.notFoundPage} ${darkMode ? styles.darkMode : ""}`}>
      <div className={`${styles.notFoundContent} ${isGlitching ? styles.glitchEffect : ""}`}>
        <h1>404</h1>
        <div className={styles.memeContainer}>
          {image && (
            <img
              src={image}
              alt="404 Meme"
              className={styles.memeImage}
            />
          )}
          <p className={styles.memeMessage}>{message}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={refreshMeme} className={styles.refreshButton}>
            🔄 New Meme
          </button>
          <Link to="/" className={styles.homeButton}>
            🏠 Go Home
          </Link>
        </div>
        <p className={styles.tip}>Pro tip: Try refreshing for more memes!</p>
      </div>
    </div>
  );
};

export default NotFoundPage;