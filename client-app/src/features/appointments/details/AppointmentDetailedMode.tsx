import React from "react";
import { Checkbox, Header } from "semantic-ui-react";

interface IProps {
  edit: boolean;
  setEdit: (edit: boolean) => void;
}
const AppointmentDetailedMode: React.FC<IProps> = ({ edit, setEdit }) => {
  return (
    <div className="appointmentDetails__mode">
      <Header as="h4" style={{ margin: 0 }}>
        Mode:
      </Header>
      <Header as="h4" color="grey" style={{ margin: "0", marginLeft: "3px" }}>
        {edit ? "Edit" : "Display"}
      </Header>
      <Checkbox
        toggle
        style={{ marginLeft: "auto" }}
        value={edit.toString()}
        onChange={() => setEdit(!edit)}
      />
    </div>
  );
};

export default AppointmentDetailedMode;
