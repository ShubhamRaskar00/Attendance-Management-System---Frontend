import React, { useEffect, useState } from "react";
import useApi from "../../apiService/useApi";
import Loading from "../../components/Loading";
import AdminDashboard from "../../components/AdminDashboard";
import EmployeeDashboard from "../../components/EmployeeDashboard";
import NotFound from "../../components/NotFound";

function Dashboard() {
  const { loading, callApi } = useApi();
  const [userRole, setUserRole] = useState("");

  const getUserRole = async () => {
    try {
      const id = localStorage.getItem("userId");
      const response = await callApi("get", `/attendance/getuser/${id}`);
      setUserRole(response.role);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserRole();
  }, []);

  return (
    <div className="h-full">
      {userRole === "employee" ? (
        // For employee attendant
        <EmployeeDashboard/>
      ) : userRole === "admin" ? (
        // Admin by resolve employee attendant
        <AdminDashboard />
      ) : loading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Dashboard;
