import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MemeExplorer from "./pages/MemeExplorer";
import MemeUpload from "./pages/MemeUpload";
import UserProfile from "./pages/UserProfile";
import Leaderboard from "./pages/Leaderboard"; // Add this import
import styles from "./App.module.css";
import MemeDetails from "./pages/MemeDetails";
import NotFoundPage from "./pages/NotFoundPage"; 

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <AppContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
};

// Separate component to use useLocation
const AppContent = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation(); // Get the current route

  return (
    <div className={`${styles.app} ${darkMode ? styles.darkMode : ""}`}>
      

      {/* Leaderboard Button (Conditionally Rendered) */}
      {location.pathname !== "/leaderboard" && (
        <Link to="/leaderboard" className={styles.leaderboardButton}>
          🏆 Leaderboard
        </Link>
      )}

      {/* Profile Button (Conditionally Rendered) */}
      {location.pathname !== "/profile" && (
        <Link to="/profile" className={styles.profileButton}>
          👤 Profile
        </Link>
      )}

      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Wrap all Routes inside <Routes> */}
      <Routes>
        <Route
          path="/"
          element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        />
        <Route
          path="/explore"
          element={<MemeExplorer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        />
        <Route
          path="/meme/:id"
          element={<MemeDetails darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        />
        <Route
          path="/upload"
          element={<MemeUpload darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        />
        <Route
          path="/profile"
          element={<UserProfile darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>}
        />
          <Route
            path="*"
            element={<NotFoundPage darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>}
          />
      </Routes>
    </div>
  );
};

export default App;