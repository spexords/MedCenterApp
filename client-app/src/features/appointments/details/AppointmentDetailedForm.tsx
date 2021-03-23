import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import {
  combineValidators,
  isRequired,
} from "revalidate";
import { Form, Button } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { DateInput } from "../../../app/common/form/DateInput";
import { DropdownInput } from "../../../app/common/form/DropdownInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { status } from "../../../app/common/options/statusOptions";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import {
  AppointmentFormValues,
  UpdateAppointmentFormValues,
} from "../../../app/models/appointment";
import { RootStoreContext } from "../../../app/stores/rootStore";

const AppointmentDetailedForm: React.FC<{
  edit: boolean;
}> = ({ edit }) => {
  const rootStore = useContext(RootStoreContext);
  const { appointment, updateAppointment } = rootStore.appointmentStore;

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

  const [appointmentFormValues, setAppointmentFormValues] = useState(
    new AppointmentFormValues()
  );
  useEffect(() => {
    setAppointmentFormValues(new AppointmentFormValues(appointment! as any));
  }, [appointment]);

  const validate = combineValidators({
    doctorId: isRequired("Doctor"),
    patientId: isRequired("Patient"),
    date: isRequired("Date"),
    time: isRequired("Time"),
    status: isRequired("Status"),
  });

  const handleFinalFormSubmit = (
    values: AppointmentFormValues
  ): Promise<void> => {
    const appointmentValues = new UpdateAppointmentFormValues(values);
    console.log(appointmentValues);
    return updateAppointment(appointmentValues);
  };

  if (doctorOptions.length === 0 || patientOptions.length === null) {
    return <LoadingComponent />;
  } else
    return (
      <div className="appointmentDetails__basic">
        <FinalForm
          validate={validate}
          initialValues={appointmentFormValues}
          onSubmit={handleFinalFormSubmit}
          render={({
            handleSubmit,
            submitting,
            invalid,
            pristine,
            dirtySinceLastSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                readOnly={!edit}
                component={DropdownInput}
                label="Doctor"
                name="doctorId"
                initialValue={appointmentFormValues?.doctorId}
                value={appointmentFormValues?.doctorId}
                options={doctorOptions}
                search
                selection
              />
              <Field
                component={DropdownInput}
                readOnly={!edit}
                label="Patient"
                name="patientId"
                initialValue={appointmentFormValues?.patientId}
                value={appointmentFormValues?.patientId}
                options={patientOptions}
                search
                selection
              />
              <Field
                component={DateInput}
                date={true}
                readOnly={!edit}
                name="date"
                label="Date"
                value={appointmentFormValues?.date}
              />
              <Field
                component={DateInput}
                time={true}
                readOnly={!edit}
                name="time"
                label="Time"
                value={appointmentFormValues?.time}
              />
              <Field
                component={SelectInput}
                name="status"
                label="Status"
                readOnly={!edit}
                value={appointmentFormValues?.status}
                options={status}
              />
              <Field
                component={TextAreaInput}
                name="reason"
                readOnly={!edit}
                value={appointmentFormValues?.reason}
                label="Reason"
                rows={2}
              />
              <Field
                component={TextAreaInput}
                name="description"
                readOnly={!edit}
                label="Description"
                value={appointmentFormValues?.description}
                rows={3}
              />
              <Button
                color="blue"
                fluid
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                loading={submitting}
              >
                Update
              </Button>
            </Form>
          )}
        />
      </div>
    );
};

export default observer(AppointmentDetailedForm);
