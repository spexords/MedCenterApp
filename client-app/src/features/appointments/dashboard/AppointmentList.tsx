import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { format } from "date-fns";
import AppointmentCard from "./AppointmentCard";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const AppointmentList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    appointmentsByDate,
    fetchingAppointments,
  } = rootStore.appointmentStore;
  return fetchingAppointments ? (
    <LoadingComponent content="loading" />
  ) : (
    <div className="appointmentList">
      {appointmentsByDate?.map(([group, appointments]) => (
        <Fragment key={group}>
          <Label size="large" color="blue" style={{ marginTop: "15px" }}>
            {format(new Date(group), "eeee do MMMM yyyy")}
          </Label>
          <Item.Group divided>
            {appointments?.map((appointment) => (
              <AppointmentCard appointment={appointment} key={appointment.id} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </div>
  );
};

export default observer(AppointmentList);
