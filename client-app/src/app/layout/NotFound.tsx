import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but couldn't find this.
      </Header>
      <Button as={Link} to="/dashboard" primary>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
