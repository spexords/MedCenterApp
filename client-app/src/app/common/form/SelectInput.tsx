import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string>, FormFieldProps {
  readOnly?: boolean
}

export const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  readOnly,
  label,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {label && <label>{label}</label>}
      <Select
        value={input.value}
        disabled={readOnly}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label
          basic
          color="red"
          style={{ margin: 0, padding: "10px", display: "flex" }}
        >
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
