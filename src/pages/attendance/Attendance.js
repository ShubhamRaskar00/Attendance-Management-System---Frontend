import React, { useEffect, useState } from "react";
import { AdminAttendance, CheckInOut } from "../../components";
import useApi from "../../apiService/useApi";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
function Attendance() {
  const { loading, callApi } = useApi();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await callApi("get", `/attendance/getuser/${id}`);
        setUserRole(response.role);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAttendance();
  }, []);
  return (
    <div className="h-full">
      {userRole === "employee" ? (
        // For employee attendant
        <CheckInOut />
      ) : userRole === "admin" ? (
        // Admin by resolve employee attendant
        <AdminAttendance />
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

export default Attendance;
