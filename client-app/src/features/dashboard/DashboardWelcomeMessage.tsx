import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const DashboardWelcomeMessage = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  return (
    <div className="dashboard__message">
      <Header as="h1">
        Welcome Back!
        <Header.Subheader>
          {user?.firstName} {user?.lastName}{" "}
          <span role="img" aria-label="hands">
            👋
          </span>
        </Header.Subheader>
      </Header>
      <img
        className="dashboard__image"
        src="./assets/doctors.png"
        alt="doctors-cartoon"
      />
    </div>
  );
};

export default observer(DashboardWelcomeMessage);
