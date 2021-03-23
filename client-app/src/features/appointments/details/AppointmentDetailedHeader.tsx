import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import ConfirmationModal from "../../../app/common/modals/ConfirmationModal";
import { RootStoreContext } from "../../../app/stores/rootStore";

const AppointmentDetailedHeader = () => {
  const rootStore = useContext(RootStoreContext);
  const { deleteAppointment, appointment } = rootStore.appointmentStore;
  const { openModal, closeModal } = rootStore.modalStore;

  const handleDeleteAppointment = () => {
    openModal(
      <ConfirmationModal
        header="Confirmation"
        message="Are you sure you want to delete this appointment?"
        callback={() => {
          deleteAppointment(appointment!.id!);
          closeModal();
        }}
      />
    );
  };

  return (
    <div className="appointmentDetails__header">
      <Header as="h1" style={{ margin: 0 }}>
        Appointment
      </Header>
      <Button negative icon size="large" onClick={handleDeleteAppointment}>
        <Icon name="trash alternate outline" />
      </Button>
    </div>
  );
};

export default observer(AppointmentDetailedHeader);
