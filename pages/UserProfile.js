import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import FloatingButton from "../components/FloatingButton";

const UserProfile = ({ darkMode }) => {

  const [user, setUser] = useState({
    name: "USER NAME ",
    bio: "ENTER BIO.",
    profilePicture: "https://via.placeholder.com/150",
  });

  const [uploadedMemes, setUploadedMemes] = useState([
    { id: 1, title: "Meme 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, title: "Meme 2", imageUrl: "https://via.placeholder.com/150" },
  ]);


  const [likedMemes, setLikedMemes] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(savedLikes);
  }, []);


  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const { name, bio, profilePicture } = user;
    alert("Profile updated successfully!");
    console.log("Updated Profile:", { name, bio, profilePicture });
  };

  return (
    <div className={`${styles.userProfile} ${darkMode ? styles.darkMode : ""}`}>
       
     {/* Floating Button */}
      <FloatingButton to="/">🏠</FloatingButton>
      <h1>User Profile</h1>

      {/* Profile Info Section */}
      <div className={styles.profileInfo}>
        <img
          src={user.profilePicture}
          alt="Profile"
          className={styles.profilePicture}
        />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <button
          onClick={() => document.getElementById("editProfileModal").showModal()}
          className={styles.editButton}
        >
          Edit Profile
        </button>
      </div>

      {/* Uploaded Memes Section */}
      <div className={styles.uploadedMemes}>
        <h2>Uploaded Memes</h2>
        {uploadedMemes.length > 0 ? (
          <div className={styles.memeGrid}>
            {uploadedMemes.map((meme) => (
              <div key={meme.id} className={styles.memeCard}>
                <img src={meme.imageUrl} alt={meme.title} />
                <p>{meme.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No memes uploaded yet.</p>
        )}
      </div>

      {/* Liked Memes Section */}
      <div className={styles.likedMemes}>
        <h2>Liked Memes</h2>
        {likedMemes.length > 0 ? (
          <div className={styles.memeGrid}>
            {likedMemes.map((meme) => (
              <div key={meme.id} className={styles.memeCard}>
                <img src={meme.imageUrl} alt={meme.title} />
                <p>{meme.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No liked memes yet.</p>
        )}
      </div>

      {/* Edit Profile Modal */}
      <dialog id="editProfileModal" className={styles.modal}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="profilePicture">Profile Picture URL</label>
            <input
              type="url"
              id="profilePicture"
              value={user.profilePicture}
              onChange={(e) =>
                setUser({ ...user, profilePicture: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => document.getElementById("editProfileModal").close()}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default UserProfile;