import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={90} />
    </Box>
  );
}

export default Loading