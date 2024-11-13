import { Typography } from "@mui/material";
import React from "react";

function LabelField({children, variant, customClass}) {
  return (
    <Typography variant={variant} className={customClass}>
      {children}
    </Typography>
  );
}

export default LabelField;
