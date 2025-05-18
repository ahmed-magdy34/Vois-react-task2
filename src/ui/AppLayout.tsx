import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "./AppLayout.module.css";

/**
 * AppLayout Component
 *
 * A layout component that provides the basic structure for the application.
 * It renders the common Header and SideBar components and includes an Outlet
 * to render the specific content for nested routes.
 *
 * @component
 * @example
 * return (
 *   <AppLayout>
 *     <YourNestedComponent />
 *   </AppLayout>
 * );
 *
 * @returns {JSX.Element} The rendered AppLayout component.
 */
const AppLayout: React.FC = () => {
  return (
    <div className={styles.applayout}>
      <Header />
      <SideBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
