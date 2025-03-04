import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { motion, AnimatePresence } from "framer-motion";
import FloatingButton from "../components/FloatingButton";
import styles from "../App.module.css";

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const [trendingMemes, setTrendingMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the "Don't Click Here" button click
  const handleDontClick = () => {
    navigate("/this-page-does-not-exist"); // Redirect to a non-existent route
  };

  // Fetch memes from the API
  useEffect(() => {
    const fetchTrendingMemes = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        if (data.success) {
          setTrendingMemes(data.data.memes.slice(0, 6));
        } else {
          throw new Error("Failed to fetch memes");
        }
      } catch (err) {
        console.error("Error fetching memes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMemes();
  }, []);

  return (
    <div className={`${styles.homePage} ${darkMode ? styles.darkMode : ""}`}>
      {/* Floating Button */}
      <FloatingButton to="/explore">🚀</FloatingButton>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1>Welcome to the Meme Verse</h1>
        <p>Create, explore, and share hilarious memes with the world!</p>
        <Link to="/explore" className={styles.exploreButton}>
          Explore Memes
        </Link>
        {/* Link to Meme Upload Page */}
        <Link to="/upload" className={styles.uploadButton}>
          Upload Meme
        </Link>
      </div>

      {/* Trending Memes Section */}
      <div className={styles.trendingSection}>
        <h2>Trending Memes</h2>
        {loading ? (
          <div className={styles.loading}>Loading trending memes...</div>
        ) : (
          <div className={styles.memeContainer}>
            <AnimatePresence>
              {trendingMemes.map((meme) => (
                <motion.div
                  key={meme.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className={styles.memeCard}
                >
                  <img src={meme.url} alt={meme.name} />
                  <h3>{meme.name}</h3>
                  <p>Likes: {meme.likes || 0}</p>
                  <p>Comments: {meme.comments || 0}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Don't Click Here Button */}
      <button onClick={handleDontClick} className={styles.dontClickButton}>
        Don't Click Here
      </button>

      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default HomePage;