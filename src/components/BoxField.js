import React from "react";
import { Paper } from "@mui/material";

function BoxField({ children, customClass, elevation }) {
  return (
    <Paper
      className={`${customClass} border p-5 rounded-lg shadow-lg`}
      elevation={elevation}
    >
      {children}
    </Paper>
  );
}

export default BoxField;
