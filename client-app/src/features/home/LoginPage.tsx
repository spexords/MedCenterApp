import React, { useContext } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";

import { Field, Form as FinalForm } from "react-final-form";
import "./LoginPage.css";
import { IUserFormValues } from "../../app/models/user";
import { TextInput } from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { combineValidators, isRequired } from "revalidate";

import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";

const LoginPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  const validate = combineValidators({
    email: isRequired("Email"),
    password: isRequired("Password"),
  });

  return (
    <div className="homePage">
      <Segment padded="very">
        <Header as="h1" icon textAlign="center">
          <Icon name="user doctor" circular />
          <Header.Content style={{ padding: "0px 30px" }}>
            Medical Center
          </Header.Content>
        </Header>
        <Segment padded>
          <FinalForm
            onSubmit={(values: IUserFormValues) =>
              login(values).catch((error) => {
                return {
                  [FORM_ERROR]: error,
                };
              })
            }
            validate={validate}
            render={({
              handleSubmit,
              submitting,
              invalid,
              submitError,
              pristine,
              dirtySinceLastSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field name="email" component={TextInput} placeholder="Email" />
                <Field
                  name="password"
                  component={TextInput}
                  placeholder="Password"
                  type="password"
                />
                {submitError && !dirtySinceLastSubmit && (
                  <Message>
                    <Message.Content content="Invalid email or password" />
                  </Message>
                )}
                <Button
                  fluid
                  content="Login"
                  loading={submitting}
                  disabled={
                    (invalid && !dirtySinceLastSubmit) || pristine || submitting
                  }
                />
              </Form>
            )}
          />
        </Segment>
      </Segment>
    </div>
  );
};

export default observer(LoginPage);
