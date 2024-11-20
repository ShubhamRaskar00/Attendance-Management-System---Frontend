import React, { useEffect, useState } from "react";
import ButtonField from "./ButtonField";
import Table from "./Table";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DialogBox from "./DialogBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useApi from "../apiService/useApi";
import formatDateTime from "../utils/formatDate";
import calculateHours from "../utils/calculateHours";
import toast from "react-hot-toast";
import downloadCSV from "../utils/downloadCSV";

function AdminAttendance() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const { callApi } = useApi();

  const adminAttendantTableCol = [
    { field: "id", headerName: "Index", width: 70 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 160,
      flex: 1,
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
      sortable: false,
      renderCell: (data) => {
        return (
          <div>
            <IconButton
              onClick={(event) => {
                handleOpenCloseMenu(event, data.row);
              }}
              size="small"
            >
              <MoreVertIcon />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={() => handleOpenCloseMenu()}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={(event) => generatePDFAndCSV("pdf", selectedRow)}
                >
                  PDF
                </MenuItem>
                <MenuItem
                  onClick={(event) => generatePDFAndCSV("csv", selectedRow)}
                >
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

  const handleOpenCloseDialog = () => {
    setIsOpen(!isOpen);
  };


  const handleOpenCloseMenu = (event, row) => {
    if (anchorEl) {
      setAnchorEl(null);
      setSelectedRow(null);
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    }
    setOpenMenu(!openMenu);
  };

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
        department: item.userId.department,
        startDate: item.checkIn,
        endDate: item.checkOut,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const generatePDFAndCSV = async (what, row) => {
    try {
      if (row.checkin === "N/A" || row.checkout === "N/A") {
        toast.error("Please checkin or checkout first");
        return; 
      }

      const payload = {
        ...row,
        format: what,
      };

      if (what === "pdf") {
        const response = await callApi(
          "post",
          "/report/generate",
          payload,
          "blob"
        );
        
        const pdfBlob = new Blob([response], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
        toast.success("PDF generated successfully!");
      } else if (what === "csv") {
        const response = await callApi("post", "/report/generate", payload);
        downloadCSV(response);
        toast.success("CSV generated successfully!");
      } else {
        toast.error("Invalid format specified");
      }
    } catch (error) {
      console.error("Error generating report:", error.message);
      toast.error("Something went wrong while generating the report");
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div className="w-full flex flex-col py-4">
      <div className="text-end py-4">
        <ButtonField
          onClick={handleOpenCloseDialog}
          variant="contained"
          sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
        >
          Add Employee
        </ButtonField>
      </div>
      <Table rows={data} columns={adminAttendantTableCol} />
      <DialogBox
        handleOpenClose={handleOpenCloseDialog}
        openBox={isOpen}
        what="Attendance"
        initialValues={initialValues}
        validationRule={validationRule}
      />
    </div>
  );
}

export default AdminAttendance;
