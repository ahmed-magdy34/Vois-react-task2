import React from "react";
import { useSelector } from "react-redux";
import DashboardView from "../features/dashboard/DashboardView";

const Dashboard = () => {
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
