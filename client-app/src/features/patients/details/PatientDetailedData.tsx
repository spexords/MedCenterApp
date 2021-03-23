import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import {
  combineValidators,
  composeValidators,
  isRequired,
  isAlphabetic,
  isNumeric,
} from "revalidate";
import { Button, Checkbox, Form, Header, Tab } from "semantic-ui-react";
import { DateInput } from "../../../app/common/form/DateInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { TextInput } from "../../../app/common/form/TextInput";
import { gender } from "../../../app/common/options/genderOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PatientDetailedData = () => {
  const rootStore = useContext(RootStoreContext);
  const { patient, updatePatient } = rootStore.patientStore;
  const [edit, setEdit] = useState(false);
  const validate = combineValidators({
    firstName: composeValidators(isRequired, isAlphabetic)("First Name"),
    lastName: composeValidators(isRequired, isAlphabetic)("Last Name"),
    pesel: composeValidators(isRequired, isNumeric)("Pesel"),
  });
  const handleFinalForm = (values: any): Promise<void> => updatePatient(values);

  return (
    <Tab.Pane>
      <div className="patientDetailedData">
        <div className="patientDetailedData__header">
          <Header as="h4" style={{ margin: 0 }}>
            Mode:
          </Header>
          <Header
            as="h4"
            color="grey"
            style={{ margin: "0", marginLeft: "3px" }}
          >
            {edit ? "Edit" : "Display"}
          </Header>
          <Checkbox
            toggle
            style={{ marginLeft: "auto" }}
            onChange={() => setEdit(!edit)}
            checked={edit}
          />
        </div>
        {patient && (
          <div className="patientDetailedData__info">
            <FinalForm
              validate={validate}
              initialValues={patient}
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
                    label="Pesel"
                    value={patient.pesel}
                    readOnly={!edit}
                    name="pesel"
                    placeholder="Pesel"
                  />
                  <Field
                    component={TextInput}
                    label="First Name"
                    value={patient.firstName}
                    readOnly={!edit}
                    name="firstName"
                    placeholder="First Name"
                  />
                  <Field
                    component={TextInput}
                    label="Last Name"
                    value={patient.lastName}
                    readOnly={!edit}
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <Field
                    component={DateInput}
                    label="Birth Date"
                    value={new Date(patient.birthDate)}
                    readOnly={!edit}
                    date={true}
                    time={false}
                    name="birthDate"
                    placeholder="Birth Date"
                  />
                  <Field
                    component={SelectInput}
                    label="Gender"
                    value={patient.gender}
                    readOnly={!edit}
                    name="gender"
                    placeholder="Gender"
                    options={gender}
                  />
                  {edit ? (
                    <Button
                      color="blue"
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      loading={submitting}
                      content="Update"
                      fluid
                    />
                  ) : (
                    <div />
                  )}
                </Form>
              )}
            />
          </div>
        )}
      </div>
    </Tab.Pane>
  );
};

export default observer(PatientDetailedData);
