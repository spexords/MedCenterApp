import React, { useContext } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { gender } from "../../app/common/options/genderOptions";
import { IRegisterUserFormValues } from "../../app/models/user";
import { TextInput } from "../../app/common/form/TextInput";
import { SelectInput } from "../../app/common/form/SelectInput";
import {
  combineValidators,
  composeValidators,
  isAlphabetic,
  isNumeric,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { DateInput } from "../../app/common/form/DateInput";
import { combineDateAndTime } from "../../app/common/util/util";

const NewUserForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.adminStore;
  const validate = combineValidators({
    firstName: composeValidators(isRequired, isAlphabetic)("First Name"),
    lastName: composeValidators(isRequired, isAlphabetic)("Last Name"),
    email: composeValidators(isRequired)("Email"),
    birthDate: isRequired("Birth Date"),
    pesel: composeValidators(isRequired, isNumeric)("Pesel"),
    gender: composeValidators(isRequired)("Gender"),
  });

  const handleFinalForm = (values: IRegisterUserFormValues): Promise<void> => {
    values.birthDate = combineDateAndTime(values.birthDate!, values.birthDate!)
    return register(values)
  }

  return (
    <div className="newUserForm">
      <Segment>
        <Header as="h1">New Doctor</Header>
        <FinalForm
          validate={validate}
          onSubmit={handleFinalForm}
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
                label="First Name"
                name="firstName"
                placeholder="First Name"
              />
              <Field
                component={TextInput}
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
              />
              <Field
                component={TextInput}
                label="Email"
                name="email"
                placeholder="Email"
              />
              <Field
                component={DateInput}
                label="Birth Date"
                date={true}
                name="birthDate"
                placeholder="Birth Date"
              />
              <Field
                component={TextInput}
                label="Pesel"
                name="pesel"
                placeholder="Pesel"
              />
              <Field
                component={SelectInput}
                label="Gender"
                name="gender"
                placeholder="Gender"
                options={gender}
              />
              <Button
                color="blue"
                content="Create"
                fluid
                loading={submitting}
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              />
            </Form>
          )}
        />
      </Segment>
    </div>
  );
};

export default observer(NewUserForm);
