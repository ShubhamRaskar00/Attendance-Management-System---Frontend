import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ButtonField from "./ButtonField";
function MainView() {
  const mainMenu = [
    { label: "Attendance", path: "attendance", icon: CalendarMonthIcon },
    { label: "Dashboard", path: "dashboard", icon: SpaceDashboardIcon },
  ];
  return (
    <div className="flex space-x-5 h-full w-full flex-1 items-center justify-center">
      {mainMenu.map((menu, i) => (
        <Link to={menu.path} key={i}>
          <ButtonField
            startIcon={<menu.icon />}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              p: { xs: 2, md: 6 },
              borderRadius: "10px",
            }}
            color="white"
            size="large"
          >
            <Typography
              component="h4"
              sx={{ fontSize: { xs: "16px", md: "24px" } }}
            >
              {menu.label}
            </Typography>
          </ButtonField>
        </Link>
      ))}
    </div>
  );
}

export default MainView;
