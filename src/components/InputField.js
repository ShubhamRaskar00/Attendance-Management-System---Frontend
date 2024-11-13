import { TextField } from "@mui/material";
import React from "react";

function InputField({
  variant,
  customClass,
  label,
  size,
  error,
  errorText,
  onChange,
  name,
  type,
  value,
  onBlur,
}) {
  return (
    <TextField
      fullWidth
      name={name}
      type={type}
      value={value}
      variant={variant}
      className={customClass}
      label={label}
      size={size}
      error={error}
      helperText={errorText}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default InputField;
