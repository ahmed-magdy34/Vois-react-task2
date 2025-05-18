import React from "react";
import DashboardView from "../features/dashboard/DashboardView";

/**dashboard
 * represents the dashboard page of the application.
 * It imports the DashboardView component from the features/dashboard directory and renders it within a div.
 * This component serves as the main entry point for the dashboard section of the application.
 * It is a functional component that uses React and TypeScript.
 *
 * @returns {JSX.Element}
 * @description This component renders the dashboard page.
 */

const Dashboard: React.FC = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <DashboardView />
      </div>
    </>
  );
};

export default Dashboard;
