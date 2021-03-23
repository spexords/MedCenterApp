import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { IAppointment } from "../../app/models/appointment";

interface IProps {
  appointment: IAppointment;
}

const DashboardCardAppointment: React.FC<IProps> = ({ appointment }) => {
  const image =
    "https://react.semantic-ui.com/images/avatar/large/" +
    (appointment.patient?.gender === "Male" ? "matthew.png" : "molly.png");

  if (!appointment.patient?.id) {
    return (
      <Card>
        <Card.Content>LUL</Card.Content>
      </Card>
    );
  } else
    return (
      <Card as={Link} to={`/appointments/${appointment.id}`}>
        <Card.Content>
          {console.log(appointment.patient?.id)}
          {!!appointment.patient?.id && (
            <>
              {console.log("EZZ2")}
              <Image floated="right" size="mini" circular src={image} />
              <Card.Header
                as={Link}
                to={`/patients/${appointment.patient?.id}`}
              >
                {appointment.patient?.firstName} {appointment.patient?.lastName}
              </Card.Header>
              <Card.Meta>
                <Icon name={appointment.patient?.gender.toLowerCase() as any} />
                {`Birth: ${format(
                  new Date(appointment.patient?.birthDate),
                  "yyyy.MM.dd"
                )} (${
                  new Date().getFullYear() -
                  new Date(appointment.patient?.birthDate!).getFullYear()
                } yrs old) `}{" "}
              </Card.Meta>
            </>
          )}
          <Card.Description>
            <strong>Reason: </strong>
            {appointment.reason}
          </Card.Description>
        </Card.Content>
        {!!appointment.date && (
          <Card.Content extra>
            <Icon name="calendar check outline" />
            {format(new Date(appointment.date), "hh:mm dd.MM.yyyy")}
          </Card.Content>
        )}
      </Card>
    );
};

export default DashboardCardAppointment;
