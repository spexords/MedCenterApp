import React, { useContext } from "react";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { gender } from "../../../app/common/options/genderOptions";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { TextInput } from "../../../app/common/form/TextInput";
import { DateInput } from "../../../app/common/form/DateInput";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { IPatientFormValues } from "../../../app/models/patient";
import {
  combineValidators,
  composeValidators,
  isAlphabetic,
  isNumeric,
  isRequired,
} from "revalidate";
import { combineDateAndTime } from "../../../app/common/util/util";

const NewPatientForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createPatient } = rootStore.patientStore;
  const validate = combineValidators({
    firstName: composeValidators(isRequired, isAlphabetic)("First Name"),
    lastName: composeValidators(isRequired, isAlphabetic)("Last Name"),
    pesel: composeValidators(isRequired, isNumeric)("Pesel"),
  });

  const handleFinalForm = (values: IPatientFormValues): Promise<void> => {
    values.birthDate = combineDateAndTime(values.birthDate!, values.birthDate!)
    return createPatient(values)
  }
  return (
    <Modal.Content>
      <Header as="h1">New Patient</Header>
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
    </Modal.Content>
  );
};

export default NewPatientForm;
