import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Footer, Header, MainView } from "../../components";
import Attendance from "../attendance/Attendance";
import Dashboard from "../dashboard/Dashboard";
import { Breadcrumbs, Container, Typography } from "@mui/material";

function MainPage() {
  const location = useLocation();
  const paths = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment) => segment.replace("home", "/home"));
  return (
    <div>
      <Header />

      <div>
        <Container maxWidth="xl" className="py-6 flex flex-col h-[84vh] overflow-x-auto">
          <div className="pb-2">
            <Breadcrumbs maxItems={2} aria-label="breadcrumbs">
              {paths.map((path) => (
                <Link to={path} key={path}>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {path}
                  </Typography>
                </Link>
              ))}
            </Breadcrumbs>
          </div>
          <Routes>
            {/* Main  view  */}
            <Route path="/" element={<MainView />} />
            {/* Other routes */}
            <Route path="attendance" element={<Attendance />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
