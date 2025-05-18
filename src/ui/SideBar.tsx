import React from "react";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import MainNav from "./MainNav";

/**sidebar Component
 * renders the sidebar for the application.
 * contains the logo and the main navigation bar.
 * @component
 * @example
 * return (
 *   <logo />
 * <mainNav />
 * * )
 *
 * @returns {JSX.Element}
 */
const SideBar: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <Logo />
      <MainNav />
    </aside>
  );
};

export default SideBar;
