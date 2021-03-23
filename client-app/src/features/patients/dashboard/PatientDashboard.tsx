import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import "./PatientDashboard.css";
import PatientFilters from "./PatientFilters";
import PatientHeader from "./PatientHeader";
import PatientTable from "./PatientTable";

const PatientDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchPatients } = rootStore.patientStore;
  useEffect(() => {
    fetchPatients(true);
  }, [fetchPatients]);
  return (
    <div className="patientDashboard">
      <PatientHeader />
      <PatientFilters />
      <PatientTable />
    </div>
  );
};

export default PatientDashboard;
