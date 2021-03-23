import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import "./LeftSidebar.css";

const LeftSidebar = () => {
  const rootStore = useContext(RootStoreContext);
  const { isAdmin } = rootStore.userStore;

  return (
    <div className="leftSidebar">
      <div className="leftSidebar__logo">
        <Header as="h2" icon textAlign="center" inverted>
          <Icon name="user doctor" circular />
          <Header.Content>Medical Center</Header.Content>
        </Header>
      </div>
      <div className="leftSidebar__items">
        <NavLink to="/dashboard">
          <div className="leftSidebar__item">
            <Icon
              name="grid layout"
              size="large"
              className="leftSidebar__icon"
            />
            <h3 className="leftSidebar__caption">Dashboard</h3>
          </div>
        </NavLink>
        <NavLink to="/patients" className="leftSidebar__item">
          <Icon name="users" size="large" className="leftSidebar__icon" />
          <h3 className="leftSidebar__caption">Patients</h3>
        </NavLink>
        <NavLink to="/appointments" className="leftSidebar__item">
          <Icon
            name="calendar alternate outline"
            size="large"
            className="leftSidebar__icon"
          />
          <h3 className="leftSidebar__caption">Appointments</h3>
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin" className="leftSidebar__item">
            <Icon
              name="user secret"
              size="large"
              className="leftSidebar__icon"
            />
            <h3 className="leftSidebar__caption">Admin</h3>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default observer(LeftSidebar);
