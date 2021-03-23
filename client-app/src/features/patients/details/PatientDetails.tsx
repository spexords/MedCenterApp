import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Header, Icon, Tab } from "semantic-ui-react";
import ConfirmationModal from "../../../app/common/modals/ConfirmationModal";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PatientDetailedAppointments from "./PatientDetailedAppointments";
import PatientDetailedData from "./PatientDetailedData";
import "./PatientDetails.css";

const panes = [
  {
    menuItem: { content: "Details", icon: "user" },
    render: () => <PatientDetailedData />,
  },
  {
    menuItem: { content: "Appointments", icon: "calendar" },
    render: () => <PatientDetailedAppointments />,
  },
];

interface IProps {
  id: string;
}

const PatientDetails: React.FC<RouteComponentProps<IProps>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadPatient, patient, deletePatient } = rootStore.patientStore;
  const { openModal, closeModal } = rootStore.modalStore;
  const handleDeletePatient = () => {
    openModal(
      <ConfirmationModal
        header="Confirmation"
        message="Are you sure you want to delete this user?"
        callback={() => {
          deletePatient(patient!.id);
          closeModal();
        }}
      />
    );
  };
  
  useEffect(() => {
    loadPatient(parseInt(match.params.id));
  }, [loadPatient, match]);

  if (!patient) {
    return <LoadingComponent content="Loading patient" />;
  }

  return (
    <div className="patientDetails">
      <div className="patientDetails__header">
        <Header as="h1" style={{ margin: 0 }}>
          {patient.firstName} {patient.lastName}
        </Header>
        <Button negative icon size="large" onClick={handleDeletePatient}>
          <Icon name="trash alternate outline" />
        </Button>
      </div>
      <div className="patientDetails__data">
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="right"
          panes={panes}
        />
      </div>
    </div>
  );
};

export default observer(PatientDetails);
