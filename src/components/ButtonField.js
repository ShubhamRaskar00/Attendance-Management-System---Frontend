import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

function ButtonField({
  children,
  startIcon,
  endIcon,
  variant,
  size,
  color,
  disabled,
  sx,
  customClass,
  loadingText,
  loading,
  shape,
  onClick
}) {
  return (
    <LoadingButton
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      size={size}
      color={color}
      disabled={disabled}
      sx={sx}
      className={customClass}
      loadingIndicator={loadingText}
      loading={loading}
      disableRipple
      shape={shape}
      onClick={onClick}
    >
      {children}
    </LoadingButton>
  );
}

export default ButtonField;
