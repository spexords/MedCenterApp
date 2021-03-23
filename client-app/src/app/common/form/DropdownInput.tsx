import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Dropdown } from "semantic-ui-react";

interface IProps extends FieldRenderProps<any>, FormFieldProps {}

export const DropdownInput: React.FC<IProps> = ({
  input,
  width,
  options,
  readOnly,
  label,
  search,
  selection,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {label && <label>{label}</label>}
      <Dropdown
        value={input.value}
        disabled={readOnly}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        search={search}
        selection={selection}
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
