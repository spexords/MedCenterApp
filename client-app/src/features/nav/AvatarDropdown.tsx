import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const AvatarDropdown = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <div className="app__avatar">
      {user && (
        <Dropdown text={user.displayName} pointing="top right">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default observer(AvatarDropdown);
