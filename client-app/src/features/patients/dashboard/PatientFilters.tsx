import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PatientFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate, fetchPatients, fetchingPatients } = rootStore.patientStore;
  const [pesel, setPesel] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleFilter = () => {
    setPredicate("pesel", pesel)
    setPredicate("lastName", lastName)
    setPredicate("firstName", firstName)
    fetchPatients();
  }

  return (
    <Form className="patientFilters">
      <Form.Group widths="equal">
        <Form.Field>
          <Input
            fluid
            placeholder="Pesel"
            icon="search"
            value={pesel}
            onChange={(e) => setPesel(e.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            placeholder="Last name"
            icon="search"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            placeholder="First name"
            icon="search"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </Form.Field>
        <Button content="Search" onClick={handleFilter} loading={fetchingPatients}/>
      </Form.Group>
    </Form>
  );
};

export default observer(PatientFilters);
