import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MemeDetails.module.css";

const MemeDetails = () => {
  const { id } = useParams(); 
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    
    const mockMeme = {
      id: id,
      imageUrl: "https://via.placeholder.com/400",
      title: `Meme ${id}`,
      likes: 0,
      comments: [],
    };
    setMeme(mockMeme);
    setLikes(mockMeme.likes);
    setComments(mockMeme.comments);
  }, [id]);


  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    localStorage.setItem(`meme-${id}-likes`, updatedLikes); 
    const handleLike = () => {
        const updatedLikes = likes + 1;
        setLikes(updatedLikes);
        localStorage.setItem(`meme-${id}-likes`, updatedLikes);
      
        const likedMeme = { id, imageUrl: meme.imageUrl, title: meme.title };
        const savedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];
        savedLikes.push(likedMeme);
        localStorage.setItem("likedMemes", JSON.stringify(savedLikes));
      };

  };


  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`meme-${id}-comments`, JSON.stringify(updatedComments)); 
      setNewComment("");
    }
  };


  useEffect(() => {
    const savedLikes = localStorage.getItem(`meme-${id}-likes`);
    const savedComments = localStorage.getItem(`meme-${id}-comments`);
    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedComments) setComments(JSON.parse(savedComments));
  }, [id]);

  if (!meme) return <div>Loading...</div>;

  return (
    <div className={styles.memeDetails}>
      <h1>{meme.title}</h1>
      <img src={meme.imageUrl} alt={meme.title} className={styles.memeImage} />
      <div className={styles.interactions}>
        <button onClick={handleLike} className={styles.likeButton}>
          ❤️ {likes}
        </button>
        <div className={styles.shareOptions}>
          <button>Share on Twitter</button>
          <button>Share on Facebook</button>
        </div>
      </div>
      <div className={styles.commentsSection}>
        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Post</button>
        </form>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemeDetails;