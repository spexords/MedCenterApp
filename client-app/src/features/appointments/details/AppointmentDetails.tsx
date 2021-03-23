import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import "./AppointmentDetails.css";
import AppointmentDetailedHeader from "./AppointmentDetailedHeader";
import AppointmentDetailedMode from "./AppointmentDetailedMode";
import AppointmentDetailedForm from "./AppointmentDetailedForm";
import AppointmentDetailedConditions from "./AppointmentDetailedConditions";
import { observer } from "mobx-react-lite";

interface IProps {
  id: string;
}
const AppointmentDetails: React.FC<RouteComponentProps<IProps>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadAppointment,
    loadingAppointment,
  } = rootStore.appointmentStore;

  const [edit, setEdit] = useState(false);
  useEffect(() => {
    loadAppointment(parseInt(match.params.id));
  }, [loadAppointment, match]);

  return loadingAppointment ? (
    <LoadingComponent content="Loading appointment" />
  ) : (
    <div className="appointmentDetails">
      <AppointmentDetailedHeader />
      <AppointmentDetailedMode edit={edit} setEdit={setEdit} />
      <div className="appointmentDetails__data">
        <AppointmentDetailedForm edit={edit} />
        <AppointmentDetailedConditions edit={edit}/>
      </div>
    </div>
  );
};

export default observer(AppointmentDetails);
