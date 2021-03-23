import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import {
  combineValidators,
  composeValidators,
  isAlphabetic,
  isNumeric,
  isRequired,
} from "revalidate";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { TextInput } from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";

const AccountDetailsForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, updateAccount } = rootStore.userStore;
  const validate = combineValidators({
    firstName: composeValidators(isRequired, isAlphabetic)("First Name"),
    lastName: composeValidators(isRequired, isAlphabetic)("Last Name"),
    email: composeValidators(isRequired)("Email"),
    pesel: composeValidators(isRequired, isNumeric)("Pesel"),
  });
  const handleSubmitFinalForm = (values: any) => {
    return updateAccount(values);
  };
  return (
    <Grid.Column>
      <Segment>
        <Header as="h1">Account</Header>
        <FinalForm
          validate={validate}
          initialValues={user}
          onSubmit={handleSubmitFinalForm}
          render={({
            handleSubmit,
            submitting,
            invalid,
            pristine,
            dirtySinceLastSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                component={TextInput}
                name="firstName"
                placeholder="First Name"
                label="First Name"
                value={user?.firstName}
              />
              <Field
                component={TextInput}
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
                value={user?.lastName}
              />
              <Field
                component={TextInput}
                name="pesel"
                placeholder="Pesel"
                label="Pesel"
                value={user?.pesel}
              />
              <Field
                component={TextInput}
                name="email"
                placeholder="Email"
                label="Email"
                value={user?.email}
              />
              <Button
                fluid
                color="blue"
                loading={submitting}
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              >
                Update
              </Button>
            </Form>
          )}
        />
      </Segment>
    </Grid.Column>
  );
};

export default observer(AccountDetailsForm);
