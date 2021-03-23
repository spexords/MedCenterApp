import React from "react";
import { Grid } from "semantic-ui-react";
import AccountDetailsForm from "./AccountDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";

const Settings = () => {
  return (
    <Grid columns={2} style={{ marginTop: "20px" }}>
      <AccountDetailsForm />
      <ChangePasswordForm />
    </Grid>
  );
};

export default Settings;
