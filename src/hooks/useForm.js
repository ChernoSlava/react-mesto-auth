import { useState, useCallback } from "react";

export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );
  return { values, handleChange, resetForm };
}
