import React, { useContext, useEffect } from "react";
import "./AppointmentDashboard.css";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentList from "./AppointmentList";
import AppointmentHeader from "./AppointmentHeader";
import { RootStoreContext } from "../../../app/stores/rootStore";

const AppointmentDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchAppointments } = rootStore.appointmentStore;
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);
  return (
    <div className="appointmentDashboard">
      <AppointmentHeader />
      <div className="appointmentDashboard__content">
        <AppointmentList />
        <AppointmentFilters />
      </div>
    </div>
  );
};

export default AppointmentDashboard;
