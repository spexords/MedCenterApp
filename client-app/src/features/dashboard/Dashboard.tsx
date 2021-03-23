import React from "react";
import "./Dashboard.css";
import DashboardAppointments from "./DashboardAppointments";
import DashboardStatistics from "./DashboardStatistics";
import DashboardWelcomeMessage from "./DashboardWelcomeMessage";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardWelcomeMessage/>
      <DashboardAppointments/>
      <DashboardStatistics/>
    </div>
  );
};

export default Dashboard;
