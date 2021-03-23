import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import AquaButton from "../../../app/common/buttons/AquaButton";
import { RootStoreContext } from "../../../app/stores/rootStore";
import NewPatientForm from "./NewPatientForm";

const PatientHeader = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <div className="patientHeader">
      <h1>Patients</h1>
      <AquaButton content="+" onClick={() => openModal(<NewPatientForm/>)} />
    </div>
  );
};

export default observer(PatientHeader);
