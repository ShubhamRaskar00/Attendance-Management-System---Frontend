import React from "react";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function TimePicker({
  label,
  value,
  variant,
  size,
  onChange,
  onBlur,
  error,
  errorText,
  name,
}) {
  const handleTimeChange = (newValue) => {
    const formattedValue = newValue
    onChange({
      target: {
        name: name,
        value: formattedValue,
      },
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimeField"]}>
        <TimeField
          name={name}
          label={label}
          value={value}
          variant={variant}
          size={size}
          onChange={handleTimeChange}
          onBlur={onBlur}
          error={error}
          helperText={errorText}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default TimePicker;
