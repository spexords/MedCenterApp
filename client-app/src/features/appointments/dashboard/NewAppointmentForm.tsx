import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Modal, Header, Form, Button } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { DateInput } from "../../../app/common/form/DateInput";
import { DropdownInput } from "../../../app/common/form/DropdownInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { IAppointmentFormValues } from "../../../app/models/appointment";
import { RootStoreContext } from "../../../app/stores/rootStore";

const NewAppointmentForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createAppointment,
  } = rootStore.appointmentStore;



  const [doctorOptions, setDoctorOptions]: any = useState([]);
  useEffect(() => {
    const getOptions = async () => {
      const doctors = await agent.Doctors.list();
      setDoctorOptions(
        doctors?.map((p) => ({
          key: p.id,
          value: p.id,
          text: `${p.firstName} ${p.lastName}`,
        }))
      );
    };
    getOptions();
  }, []);

  const [patientOptions, setPatientOptions]: any = useState([]);
  useEffect(() => {
    const getOptions = async () => {
      const patients = await agent.Patients.list(null);
      setPatientOptions(
        patients?.map((p) => ({
          key: p.id,
          value: p.id,
          text: `${p.firstName} ${p.lastName}`,
        }))
      );
    };
    getOptions();
  }, []);


  const validate = combineValidators({
    doctorId: isRequired("Doctor"),
    patientId: isRequired('Patient'),
    date: isRequired("Date"),
    time: isRequired("Time"),
  });

  const handleFinalForm = (values: any): Promise<void> => {
    const appointmentValues: IAppointmentFormValues = { ...values };
    console.log(appointmentValues)
    appointmentValues.date = combineDateAndTime(values.date, values.time);
    return createAppointment(appointmentValues);
  };
  return (
    <Modal.Content>
      <Header as="h1">New Appointment</Header>
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
              component={DropdownInput}
              label="Doctor"
              name="doctorId"
              options={doctorOptions}
              placeholder="Choose doctor"
              search
              selection
            />
            <Field
              component={DropdownInput}
              label="Patient"
              name="patientId"
              options={patientOptions}
              placeholder="Choose patient"
              search
              selection
            />
            <Field
              component={DateInput}
              label="Date"
              date={true}
              name="date"
              placeholder="Date"
            />
            <Field
              component={DateInput}
              label="Time"
              time={true}
              name="time"
              placeholder="Time"
            />
            <Field
              component={TextAreaInput}
              label="Reason"
              rows={3}
              name="reason"
              placeholder="Reason"
            />
            <Button
              color="blue"
              content="Create"
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              fluid
              loading={submitting}
            />
          </Form>
        )}
      />
    </Modal.Content>
  );
};

export default observer(NewAppointmentForm);
