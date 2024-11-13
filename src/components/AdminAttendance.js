import React, { useState } from "react";
import ButtonField from "./ButtonField";
import Table from "./Table";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DialogBox from "./DialogBox";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useApi from "../apiService/useApi";
function AdminAttendance() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { callApi } = useApi();
  const rows = [
    {
      id: 1,
      firstName: "Jon",
      lastName: "Doe",
      date: "12-10-2024",
      checkin: "10:10AM",
      checkout: "10:10PM",
      hours: "12hr",
    },
  ];

  const adminAttendantTableCol = [
    { field: "id", headerName: "Index", width: 70 },
    {
      field: "fullName",
      headerName: "Name",
      minWidth: 160,
      flex: 1,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "date",
      headerName: "Date",
      sortable: false,
      type: Date,
      minWidth: 160,
      flex: 1,
    },
    {
      field: "checkin",
      headerName: "Check In",
      sortable: false,
      type: Date,
      minWidth: 160,
      flex: 1,
    },
    {
      field: "checkout",
      headerName: "Check Out",
      sortable: false,
      type: Date,
      minWidth: 160,
      flex: 1,
    },
    {
      field: "hours",
      headerName: "Hours",
      sortable: false,
      type: Date,
      minWidth: 160,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: () => {
        return (
          <div>
            <IconButton
              onClick={(event) => {
                handlePdfAndCsv(event, "");
              }}
              size="small"
            >
              <MoreVertIcon />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handlePdfAndCsv}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={(event) => handlePdfAndCsv(event, "pdf")}>
                  PDF
                </MenuItem>
                <MenuItem onClick={(event) => handlePdfAndCsv(event, "csv")}>
                  CSV
                </MenuItem>
              </Menu>
            </IconButton>
          </div>
        );
      },
    },
  ];

  const initialValues = {
    name: "",
    email: "",
    password: "",
    department: "",
  };

  const validationRule = {
    name: ["required", "name"],
    email: ["required", "email"],
    password: ["required", "password"],
    department: ["required", "department"],
  };

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  //! TODO later do this
  const datarange = {
    startDate: "2024-11-12T13:28:04.441Z",
    endDate: "2024-11-13T10:15:18.696Z",
    department: "IT",
  };

  const downloadPdfCsv = (type, data) => {
    const blob = new Blob([data.data], {
      type: type === "pdf" ? "application/pdf" : "text/csv",
    });
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `report.${type}`;
    link.click();

    // Clean up
    URL.revokeObjectURL(downloadUrl);
  };

  //! TODO Bad logic
  const handlePdfAndCsv = async (event, type) => {
    setAnchorEl(event.currentTarget);
    try {
      if (type === "pdf") {
        const data = datarange;
        data.format = type;
        const response = await callApi("post", "/report/generate", data);
        downloadPdfCsv(type, response);
      } else if (type === "csv") {
        const data = datarange;
        data.format = type;
        const response = await callApi("post", "/report/generate", data);
        downloadPdfCsv(type, response);
      }
    } catch (error) {
      console.error(error.message);
    }

    setOpenMenu(!openMenu);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="text-end py-4">
        <ButtonField
          onClick={handleOpenClose}
          variant="contained"
          sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
        >
          Add Employee
        </ButtonField>
      </div>
      <Table rows={rows} columns={adminAttendantTableCol} />
      <DialogBox
        handleOpenClose={handleOpenClose}
        openBox={isOpen}
        what="Attendance"
        initialValues={initialValues}
        validationRule={validationRule}
      />
    </div>
  );
}

export default AdminAttendance;
