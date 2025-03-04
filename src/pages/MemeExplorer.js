import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingButton from "../components/FloatingButton";
import styles from "../App.module.css";

const MemeExplorer = ({ darkMode, toggleDarkMode }) => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("likes");
  const navigate = useNavigate();
  const localmemes = [
    { id: 1, title: "Meme 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, title: "Meme 2", imageUrl: "https://via.placeholder.com/150" },]

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMemes();
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, category, sortBy]);

  <div className={styles.memeExplorer}>
      <h1>Meme Explorer</h1>
      <div className={styles.memeList}>
        {memes.map((meme) => (
          <div key={meme.id} className={styles.memeItem}>
            <Link to={`/meme/${meme.id}`}>
              <img src={meme.imageUrl} alt={meme.title} />
              <p>{meme.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>


  const fetchMemes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.imgflip.com/get_memes?page=${page}&category=${category}&search=${searchQuery}&sort=${sortBy}`
      );
      const data = await response.json();
      if (data.success) {
        setMemes((prevMemes) => [...prevMemes, ...data.data.memes]);
      } else {
        throw new Error("Failed to fetch memes");
      }
    } catch (err) {
      console.error("Error fetching memes:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.memeExplorer} ${darkMode ? styles.darkMode : ""}`}>
     {/* Floating Button */}
      <FloatingButton to="/">🏠</FloatingButton>

      <h1>Meme Explorer</h1>

      {/* Filters and Search */}
      <div className={styles.filters}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.filterDropdown}
        >
          <option value="Trending">Trending</option>
          <option value="New">New</option>
          <option value="Classic">Classic</option>
          <option value="Random">Random</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memes..."
          className={styles.searchInput}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.filterDropdown}
        >
          <option value="likes">Sort by Likes</option>
          <option value="date">Sort by Date</option>
          <option value="comments">Sort by Comments</option>
        </select>
      </div>

      {/* Meme Grid */}
      <div className={styles.memeContainer}>
        <AnimatePresence>
          {memes.map((meme) => (
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

      {loading && <div className={styles.loading}>Loading more memes...</div>}

      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default MemeExplorer;