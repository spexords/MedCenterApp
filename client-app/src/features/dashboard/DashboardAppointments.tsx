import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Card, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import DashboardCardAppointment from "./DashboardCardAppointment";

const DashboardAppointments = () => {
  const CARDS = 3;
  const rootStore = useContext(RootStoreContext);
  const {
    upcommingAppointments,
    fetchUpcommingAppointments,
  } = rootStore.dashboardStore;
  useEffect(() => {
    fetchUpcommingAppointments(CARDS);
  }, [fetchUpcommingAppointments]);
  return (
    <div className="dashboard__appointments">
      <Header as="h1">Upcomming Appointments</Header>
      <Card.Group itemsPerRow={CARDS}>
        {upcommingAppointments?.map((appointment) => (
          <DashboardCardAppointment
            key={appointment.id}
            appointment={appointment}
          />
        ))}
      </Card.Group>
    </div>
  );
};

export default observer(DashboardAppointments);
