import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import { Segment, Header, Dropdown, Button } from "semantic-ui-react";
import ConfirmationModal from "../../app/common/modals/ConfirmationModal";
import { RootStoreContext } from "../../app/stores/rootStore";

const UserActions = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUsers,
    fetchingUsers,
    userOptions,
    resetPassword,
    deleteUser,
  } = rootStore.adminStore;
  const { openModal, closeModal } = rootStore.modalStore;

  const dropdownElement: any = useRef(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleResetPassword = () => {
    const userId = dropdownElement?.current?.state?.value;
    if (userId) {
      openModal(
        <ConfirmationModal
          header="Confirmation"
          message="Are you sure you want to reset password?"
          callback={() => {
            resetPassword(userId);
            closeModal();
          }}
        />
      );
    }
  };

  const handleDeleteUser = () => {
    const userId = dropdownElement?.current?.state?.value;
    if (userId) {
      openModal(
        <ConfirmationModal
          header="Confirmation"
          message="Are you sure you want to delete this user?"
          callback={() => {
            deleteUser(userId);
            closeModal();
          }}
        />
      );
    }
  };

  return (
    <div className="userActions">
      <Segment>
        <Header as="h1">User Actions</Header>
        <Dropdown
          options={userOptions}
          fluid
          placeholder="Choose User"
          ref={dropdownElement}
          loading={fetchingUsers}
          search
        />
        <Button.Group widths={4} style={{ marginTop: 20 }}>
          <Button
            content="Reset Password"
            fluid
            onClick={handleResetPassword}
          />
          <Button.Or />
          <Button
            content="Delete User"
            fluid
            color="red"
            onClick={handleDeleteUser}
          />
        </Button.Group>
      </Segment>
    </div>
  );
};

export default observer(UserActions);
