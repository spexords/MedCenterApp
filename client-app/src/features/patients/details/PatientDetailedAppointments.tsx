import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Icon, Label, Segment } from "semantic-ui-react";
import { labelColors } from "../../../app/common/options/labelColors";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PatientDetailedAppointments = () => {
  const rootStore = useContext(RootStoreContext);
  const { appointments } = rootStore.patientStore.patient!;
  return (
    <div className="patientDetailedAppointments__container">
      {appointments.map((appointment) => (
        <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
          <Segment.Group style={{ cursor: "pointer", marginBottom: '10px' }} key={appointment.id}>
            <Segment>
              <Grid columns={3}>
                <Grid.Column>
                  <Header as="h3" style={{ margin: 0 }}>
                    <Icon name="clock outline" />
                    <Header.Content>
                      {format(new Date(appointment.date), "h:mm a")}
                  </Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" style={{ margin: 0 }}>
                    <Icon name="calendar alternate outline" />
                    <Header.Content>
                      {format(new Date(appointment.date), "dd-MM-yyyy")}
                    </Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Label color={labelColors[appointment.status]} horizontal>
                    {appointment.status}
                  </Label>
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment>
              <Grid columns={4}>
                <Grid.Column>
                  <Header as="h4" sub>
                    Doctor:
                  </Header>
                  <span>
                    {appointment.doctor?.firstName}{" "}
                    {appointment.doctor?.lastName}
                  </span>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h4" sub>
                    Reason:
                  </Header>
                  <span>{appointment.reason}</span>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h4" sub>
                    Description:
                  </Header>
                  <span>{appointment.description}</span>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h4" sub>
                    Conditions:
                  </Header>
                  <Label.Group color="black" size="mini">
                    {appointment.conditions?.map((condition) => (
                      <Label as="a">{condition.name}</Label>
                    ))}
                  </Label.Group>
                </Grid.Column>
              </Grid>
            </Segment>
          </Segment.Group>
        </Link>
      ))}
    </div>
  );
};

export default observer(PatientDetailedAppointments);
