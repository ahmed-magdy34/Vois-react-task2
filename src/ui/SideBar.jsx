import React from "react";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import MainNav from "./MainNav";

const SideBar = () => {
  return (
    <aside className={styles.aside}>
      <Logo />
      <MainNav />
    </aside>
  );
};

export default SideBar;
