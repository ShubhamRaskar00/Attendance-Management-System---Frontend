import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonField from './ButtonField'

function NotFound() {
  return (
    <div className="h-full flex justify-center flex-col space-y-4 items-center">
      <Typography sx={{ fontSize: "24px" }}>Not fond</Typography>
      <Link to="/home">
        <ButtonField
          variant="contained"
          sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
        >
          Back to home
        </ButtonField>
      </Link>
    </div>
  );
}

export default NotFound