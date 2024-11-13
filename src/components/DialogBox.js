import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import ButtonField from "./ButtonField";
import TimePicker from "./TimePicker";
import LabelField from "./LabelField";
import useFromValidation from "../hook/useFormValidation";
import InputField from "./InputField";
import useApi from "../apiService/useApi";
import toast from "react-hot-toast";

function DialogBox({
  handleOpenClose,
  openBox,
  initialValues,
  validationRule,
}) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useFromValidation(initialValues, validationRule);
  const { loading, callApi } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await callApi("post", "auth/register", values);
        handleOpenClose();
        resetForm();
        toast.success(response.message);
      } catch (error) {
        toast.error(`Error user register ${error}`);
      }
    }
  };

  return (
    <div>
      <Dialog open={openBox} onClose={handleOpenClose}>
        <DialogTitle>
          <Typography>Add Employee</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="space-y-5">
              <div className="mt-3">
                <InputField
                  name="name"
                  label="name"
                  type="text"
                  variant="outlined"
                  customClass="w-full"
                  size="small"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  errorText={touched.name && errors.name ? errors.name : ""}
                />
              </div>

              <InputField
                name="department"
                label="department"
                type="text"
                variant="outlined"
                customClass="w-full"
                size="small"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.department && errors.department}
                errorText={
                  touched.department && errors.department
                    ? errors.department
                    : ""
                }
              />
              <InputField
                name="email"
                label="Email"
                variant="outlined"
                customClass="w-full"
                size="small"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                errorText={touched.email && errors.email ? errors.email : ""}
              />
              <InputField
                name="password"
                label="Password"
                variant="outlined"
                customClass="w-full"
                size="small"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                errorText={
                  touched.password && errors.password ? errors.password : ""
                }
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonField
            variant="contained"
            sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
            onClick={handleOpenClose}
          >
            Close
          </ButtonField>
          <ButtonField
            variant="contained"
            sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
            onClick={handleSubmit}
            loading={loading}
          >
            Save
          </ButtonField>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox;
