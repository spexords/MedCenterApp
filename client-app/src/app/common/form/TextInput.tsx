import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string>, FormFieldProps {
  readOnly?: boolean
}

export const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  readOnly,
  placeholder,
  label,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {label && <label>{label}</label>}
      <input {...input} placeholder={placeholder} readOnly={readOnly} />
      {touched && error && (
        <Label basic color="red" style={{margin: 0, padding: '10px', display: 'flex'}}>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
