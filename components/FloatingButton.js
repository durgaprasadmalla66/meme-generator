import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";

const FloatingButton = ({ to, children }) => {
  return (
    <Link to={to} className={styles.floatingButton}>
      {children}
    </Link>
  );
};

export default FloatingButton;