import { useState, useCallback } from "react";
import { validators } from "../utils/validations";

const useFromValidation = (initialValues, validationRule) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, value) => {
      const fieldValidators = validationRule[name];
      if (!fieldValidators) return "";

      for (const validator of fieldValidators) {
        const error = validators[validator](value);
        if (error) return error;
      }
      return "";
    },
    [validationRule]
  );

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setValues((prev) => ({ ...prev, [name]: value }));

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const validateForm = useCallback(() => {
    const newError = {};
    let isValid = true;

    Object.keys(validationRule).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);

      if (error) {
        newError[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newError);
    return isValid;
  }, [validateField, validationRule, values]);

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  };
};

export default useFromValidation;
