import React from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../features/auth/AuthSlice";

const Header = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  return (
    <header className={styles.header}>
      <p className={styles.email}>{email}</p>
      <button
        className={styles.logoutButton}
        onClick={() => dispatch(clearAuth())}
      >
        log out
      </button>
    </header>
  );
};

export default Header;
