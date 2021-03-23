import { AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Header, Label, Segment } from "semantic-ui-react";
import { AdvancedErrorMessage } from "../../app/common/form/AdvancedErrorMessage";
import { RootStoreContext } from "../../app/stores/rootStore";

const ChangePasswordForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { changePassword, changingPassword } = rootStore.userStore;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [error, setError] = useState<AxiosResponse<any> | null>(null);

  const handleChangePassword = () => {
    if (newPassword !== repeatedNewPassword) {
      setLocalError("New password doest not match with repeted");
    } else if (newPassword.length === 0) {
      setLocalError("New password cannot be empty");
    } else {
      changePassword(currentPassword, newPassword).catch((e) => {
        setError(e);
      });
    }
  };

  useEffect(() => {
    setError(null);
    setLocalError(null);
  }, [currentPassword, newPassword, repeatedNewPassword]);

  return (
    <Grid.Column>
      <Segment>
        <Header as="h1">Password</Header>
        <Form>
          <Form.Field>
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.currentTarget.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.currentTarget.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm New Password</label>
            <input
              type="password"
              value={repeatedNewPassword}
              onChange={(e) => setRepeatedNewPassword(e.currentTarget.value)}
            />
            {localError && (
              <Label content={localError} basic pointing color="red" />
            )}
          </Form.Field>
          {error && <AdvancedErrorMessage error={error} />}
          <Button
            fluid
            color="blue"
            loading={changingPassword}
            disabled={!!error && !!localError}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Form>
      </Segment>
    </Grid.Column>
  );
};

export default observer(ChangePasswordForm);
