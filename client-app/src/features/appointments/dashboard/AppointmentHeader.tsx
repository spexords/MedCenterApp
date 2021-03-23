import React, { useContext } from "react";
import AquaButton from "../../../app/common/buttons/AquaButton";
import { RootStoreContext } from "../../../app/stores/rootStore";
import NewAppointmentForm from "./NewAppointmentForm";

const AppointmentHeader = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <div className="appointmentHeader">
      <h1>Appointments</h1>
      <AquaButton
        content="+"
        onClick={() => openModal(<NewAppointmentForm />)}
      />
    </div>
  );
};

export default AppointmentHeader;
