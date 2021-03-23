import React from "react";
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";

interface IProps {
  error: AxiosResponse;
}

export const AdvancedErrorMessage: React.FC<IProps> = ({ error }) => {
  return (
    <Message>
      <Message.Header>{error.statusText}</Message.Header>
      {error?.data?.errors?.Password.map((e: any) => (
        <Message.Content content={e.Description} />
      ))}
    </Message>
  );
};
