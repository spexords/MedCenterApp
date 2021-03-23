import React from "react";
import "./AdminDashboard.css";
import NewUserForm from "./NewUserForm";
import UserActions from "./UserActions";

const AdminDashboard = () => {

  return (
    <div className="adminDashboard">
      <NewUserForm/>
      <UserActions/>
    </div>
  );
};

export default AdminDashboard;
