import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Calendar } from "react-widgets";
import { Header, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const AppointmentFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    setDatePredicate,
    datePredicate,
    allAppointmentPredicate,
    setAllAppointmentPredicate,
  } = rootStore.appointmentStore;
  return (
    <div className="appointmentFilters">
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        <Header
          icon={"filter"}
          attached
          style={{ color: "rgb(31, 41, 90)" }}
          content={"Filters"}
        />
        <Menu.Item
          color={"blue"}
          name={"all"}
          content={"All Appointments"}
          onClick={() => setAllAppointmentPredicate("true")}
          active={allAppointmentPredicate === "true"}
        />
        <Menu.Item
          color={"blue"}
          name={"host"}
          content={"My Appointments"}
          onClick={() => setAllAppointmentPredicate("false")}
          active={allAppointmentPredicate === "false"}
        />
      </Menu>

      <Menu vertical size={"large"} style={{ width: "100%" }}>
        <Header
          style={{ color: "rgb(31, 41, 90)" }}
          icon={"calendar"}
          attached
          content={"Pick a start date"}
        />
        <Calendar
          onChange={(date) => setDatePredicate(date!)}
          value={datePredicate}
        />
      </Menu>
    </div>
  );
};

export default observer(AppointmentFilters);
