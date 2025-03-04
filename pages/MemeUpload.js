import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";

const MemeUpload = ({ darkMode, toggleDarkMode }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [aiCaption, setAiCaption] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // Generateing AI-based meme 
  const generateAiCaption = async () => {
    try {
      const response = await fetch("https://api.memegen.link/templates");
      const templates = await response.json();
      if (templates.length > 0) {
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        const memeUrl = `https://api.memegen.link/images/${randomTemplate.id}/_/${randomTemplate.name}.png`;
        setAiCaption(randomTemplate.name);
        setCaption(randomTemplate.name);
        setPreviewUrl(memeUrl); 
      }
    } catch (err) {
      console.error("Error generating AI caption:", err);
      alert("Failed to generate AI caption. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a meme file.");
      return;
    }
    console.log("Uploading meme:", { file, caption });
    alert("Meme uploaded successfully!");
  };

  return (
    <div className={`${styles.memeUpload} ${darkMode ? styles.darkMode : ""}`}>
      {/* Back Button */}
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>

      <h1>Upload Your Meme</h1>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        {/* File Upload */}
        <div className={styles.formGroup}>
          <label htmlFor="file">Upload Meme (Image/GIF)</label>
          <input
            type="file"
            id="file"
            accept="image/*, .gif"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        {/* Caption Input */}
        <div className={styles.formGroup}>
          <label htmlFor="caption">Add Caption</label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter a funny caption..."
            className={styles.captionInput}
          />
        </div>

        {/* AI Caption Generator */}
        <div className={styles.formGroup}>
          <button
            type="button"
            onClick={generateAiCaption}
            className={styles.aiCaptionButton}
          >
            Generate AI Caption
          </button>
          {aiCaption && <p className={styles.aiCaption}>AI Suggestion: {aiCaption}</p>}
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className={styles.previewSection}>
            <h2>Preview</h2>
            <img src={previewUrl} alt="Meme Preview" className={styles.previewImage} />
            <p className={styles.previewCaption}>{caption}</p>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.uploadButton}>
          Upload Meme
        </button>
      </form>

      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default MemeUpload;