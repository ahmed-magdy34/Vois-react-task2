import React from "react";
import styles from "./MainNav.module.css";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BsSignpostSplit } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";

/**MainNav Component
 * renders the main navigation bar for the application.
 * contains links to the home, posts, and create post pages.
 * uses react-router-dom's NavLink for navigation.
 * icons are imported from react-icons.
 * @component
 *
 *
 * @returns {JSX.Element}
 */

const MainNav: React.FC = () => {
  return (
    <nav>
      <ul className={styles.NavList}>
        <li>
          <NavLink className={styles.navlink} to="/dashboard">
            <IoHomeOutline />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts" className={styles.navlink}>
            <BsSignpostSplit />
            <span>Posts</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/newpost" className={styles.navlink}>
            <TfiWrite />
            <span>Create Post</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
