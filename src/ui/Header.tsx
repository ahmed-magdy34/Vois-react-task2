import React from "react";
import type { RootState, AppDispatch } from "../store/store"; // adjust the path as needed

import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../features/auth/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.email);
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
