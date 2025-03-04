import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For smooth animations
import styles from "../App.module.css";

const Leaderboard = ({ darkMode }) => {
  const [topMemes, setTopMemes] = useState([
    { id: 1, title: "Meme 1", likes: 150, imageUrl: "https://picsum.photos/150" },
    { id: 2, title: "Meme 2", likes: 120, imageUrl: "https://picsum.photos/150" },
    { id: 3, title: "Meme 3", likes: 100, imageUrl: "https://picsum.photos/150" },
    { id: 4, title: "Meme 4", likes: 90, imageUrl: "https://picsum.photos/150" },
    { id: 5, title: "Meme 5", likes: 80, imageUrl:  "https://picsum.photos/150" },
    { id: 6, title: "Meme 6", likes: 70, imageUrl:  "https://picsum.photos/150"},
    { id: 7, title: "Meme 7", likes: 60, imageUrl: "https://picsum.photos/150" },
    { id: 8, title: "Meme 8", likes: 50, imageUrl: "https://picsum.photos/150"},
    { id: 9, title: "Meme 9", likes: 40, imageUrl: "https://picsum.photos/150" },
    { id: 10, title: "Meme 10", likes: 30, imageUrl: "https://picsum.photos/150"},
  ]);

  // Simulating dynamic like updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTopMemes((prevMemes) =>
        prevMemes
          .map((meme) => ({
            ...meme,
            likes: meme.likes + Math.floor(Math.random() * 10),
          }))
          .sort((a, b) => b.likes - a.likes) // Keep leaderboard sorted
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.leaderboardPage} ${darkMode ? styles.darkMode : ""}`}>
      {/* Home Button */}
      <Link to="/" className={styles.homeButton}>
        🏠
      </Link>

      <h1>🏆 TOP MEMES </h1>

      {/* Leaderboard List */}
      <div className={styles.leaderboardList}>
        {topMemes.map((meme, index) => (
          <motion.div
            key={meme.id}
            className={styles.leaderboardItem}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.rank}>#{index + 1}</span>
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className={styles.memeImage}
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback image
            />
            <div className={styles.memeDetails}>
              <h3>{meme.title}</h3>
              <p>❤️ {meme.likes} Likes</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
