import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string>, FormFieldProps {}

export const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
  rows,
  label,
  readOnly = false,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {label && <label>{label}</label>}
      <textarea rows={rows} {...input} placeholder={placeholder} disabled={readOnly} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
