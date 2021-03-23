import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date>, FormFieldProps {
  readOnly?: boolean;
}

export const DateInput: React.FC<IProps> = ({
  id = undefined,
  label,
  input,
  width,
  date = false,
  time = false,
  readOnly,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {label && <label>{label}</label>}
      <DateTimePicker
        date={date}
        time={time}
        placeholder={placeholder}
        disabled={readOnly}
        value={input.value as any === '' ? undefined : new Date(input.value)}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        {...rest}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
