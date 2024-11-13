import React from "react";
import { Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <MainPage />;
};

export default ProtectedRoute;
