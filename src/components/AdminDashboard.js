import React, { useEffect, useState } from "react";
import LabelField from "./LabelField";
import useApi from "../apiService/useApi";
import formatDateTime from "../utils/formatDate";
import calculateHours from "../utils/calculateHours";
import Table from "./Table";
import calculateProgress from "./CalculateProgress";
import NotFound from "./NotFound";

const adminCol = [
  { field: "id", headerName: "Index", width: 70 },
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    minWidth: 160,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    minWidth: 160,
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    sortable: false,
    minWidth: 160,
    flex: 1,
  },
  {
    field: "checkin",
    headerName: "Check In",
    sortable: false,
    minWidth: 160,
    flex: 1,
  },
  {
    field: "checkout",
    headerName: "Check Out",
    sortable: false,
    minWidth: 160,
    flex: 1,
  },
  {
    field: "hours",
    headerName: "Hours",
    sortable: false,
    minWidth: 160,
    flex: 1,
  },
  {
    field: "progress",
    headerName: "progress",
    sortable: false,
    minWidth: 160,
    flex: 1,
  },
];

function AdminDashboard() {
  const { loading, callApi } = useApi();
  const [data, setData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const getAttendance = async () => {
    try {
      const response = await callApi("get", `/admin/attendance/`);

      const formattedData = response.map((item, index) => ({
        id: index + 1,
        name: item.userId.name,
        email: item.userId.email,
        date: formatDateTime(item.date),
        checkin: item.checkIn ? formatDateTime(item.checkIn) : "N/A",
        checkout: item.checkOut ? formatDateTime(item.checkOut) : "N/A",
        hours: calculateHours(item.checkIn, item.checkOut),
        progress: calculateProgress(item.checkIn, item.checkOut),
      }));

      // Calculate total hours worked
      const totalWorkHours = formattedData.reduce((acc, item) => {
        const [hours, minutes] =
          item.hours !== "N/A" ? item.hours.split("h").map(Number) : [0, 0];
        return acc + hours + minutes / 60;
      }, 0);

      setData(formattedData);
      setTotalHours(totalWorkHours.toFixed(2));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div className="h-full">
      {data.length > 0 ? (
        <div>
          <div className="text-end">
            <LabelField customClass="pb-4" variant="h6">
              Total work hours: {totalHours} hrs
            </LabelField>
          </div>

          <Table rows={data} columns={adminCol} loading={loading} />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default AdminDashboard;
