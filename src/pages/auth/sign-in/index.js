import React, { useState } from "react";
import {
  BoxField,
  LabelField,
  InputField,
  ButtonField,
} from "../../../components/";
import useFromValidation from "../../../hook/useFormValidation";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationRule = {
    email: ["required", "email"],
    password: ["required", "password"],
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useFromValidation(initialValues, validationRule);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/login`,
          values
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        resetForm();
        navigate("/home");
        toast.success("Login successful!");
      } catch (error) {
        toast.error(`Error during login! ${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-3 h-screen flex justify-center items-center">
      <BoxField
        customClass="space-y-5 flex flex-col w-full max-w-sm mx-auto"
        elevation={12}
      >
        <LabelField variant="h6" customClass="capitalize text-center">
          Sign In
        </LabelField>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 flex flex-col w-full"
        >
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
          <ButtonField
            variant="contained"
            sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
            onClick={handleSubmit}
            loading={loading}
          >
            Sign in
          </ButtonField>
        </form>
      </BoxField>
    </div>
  );
}

export default SignIn;
