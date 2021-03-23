import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Header, Icon, Table } from "semantic-ui-react";
import { history } from "../../..";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PatientTable = () => {
  const rootStore = useContext(RootStoreContext);
  const { patients } = rootStore.patientStore;
  const selectPatient = (id: number) => {
    history.push(`/patients/${id}`)
  };
  return (
    <div className="patientTable">
      <Table celled padded selectable sortable>
        <Table.Header>
          <Table.Row >
            <Table.HeaderCell width={3} singleLine>
              Pesel
            </Table.HeaderCell>
            <Table.HeaderCell width={4} singleLine>
              Last Name
            </Table.HeaderCell>
            <Table.HeaderCell width={4} singleLine>
              First Name
            </Table.HeaderCell>
            <Table.HeaderCell width={1} singleLine>
              Gender
            </Table.HeaderCell>
            <Table.HeaderCell width={4} singleLine>
              Date of birth
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {patients?.map((patient) => (
            <Table.Row
              style={{cursor: 'pointer'}}
              key={patient.id}
              onClick={() => selectPatient(patient.id)}
            >
              <Table.Cell singleLine>
                <Header as="h4">{patient.pesel}</Header>
              </Table.Cell>
              <Table.Cell singleLine>{patient.lastName}</Table.Cell>
              <Table.Cell singleLine>{patient.firstName}</Table.Cell>
              <Table.Cell singleLine textAlign="center">
                <Icon name={patient.gender === "Other" ? "other gender" : patient.gender.toLowerCase() as any} size="large" />
              </Table.Cell>
              <Table.Cell>
                {format(new Date(patient.birthDate.toString()), "yyyy-MM-dd")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default observer(PatientTable);
