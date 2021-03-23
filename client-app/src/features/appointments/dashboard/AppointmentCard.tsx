import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import { labelColors } from "../../../app/common/options/labelColors";
import { IAppointment } from "../../../app/models/appointment";

const AppointmentCard: React.FC<{ appointment: IAppointment }> = ({
  appointment,
}) => {
  const shortenText = (text: string, maxLength: number) => {
    const length = maxLength > text?.length ? text?.length || 0 : maxLength;
    return text?.substr(0, length) + "...";
  };
  return (
    <Link to={`/appointments/${appointment.id}`}>
      <Segment style={{marginBottom: '10px'}}>
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Label
              color={labelColors[appointment.status]}
              horizontal
              style={{ margin: 0 }}
            >
              {appointment.status}
            </Label>
            <Header as="h3" style={{ margin: "10px 0px 0px 0px" }}>
              <Icon name="clock outline" />
              {format(new Date(appointment.date), "h:mm a")}
            </Header>
            <Header as="h3" style={{ margin: "7px 0px 0px 0px" }}>
              <Icon name="user md" />
              {appointment.doctor?.firstName} {appointment.doctor?.lastName}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Item.Group>
              <Item>
                <Item.Image
                  size="tiny"
                  circular
                  src={`https://react.semantic-ui.com/images/avatar/large/${
                    appointment.patient?.gender === "Male" ? "matthew" : "molly"
                  }.png`}
                />
                <Item.Content>
                  <Item.Header
                    as={Link}
                    to={`/patients/${appointment.patient?.id}`}
                  >
                    {appointment.patient?.firstName}{" "}
                    {appointment.patient?.lastName}
                  </Item.Header>
                  <Item.Extra style={{ marginTop: 2 }}>
                    <strong>Gender:</strong>
                    {appointment.patient?.gender}
                  </Item.Extra>
                  <Item.Extra style={{ marginTop: 1 }}>
                    <strong>Age:</strong>
                    {new Date().getFullYear() -
                      new Date(
                        appointment.patient?.birthDate || new Date()
                      ).getFullYear()}
                  </Item.Extra>
                  <Item.Extra style={{ marginTop: 1 }}>
                    <strong>Reason:</strong>
                    {shortenText(appointment.reason, 15)}
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    </Link>
  );
};

export default AppointmentCard;
