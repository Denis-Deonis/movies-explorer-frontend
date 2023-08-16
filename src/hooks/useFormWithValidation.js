import { useCallback, useState } from "react";

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value }); // универсальный обработчик полей
    setErrors({ ...errors, [name]: e.target.validationMessage }); // ошибок
    setIsValid(e.target.closest("form").checkValidity()); // проверка валидности
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {

      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, setIsValid, resetForm };
}

export default useFormWithValidation;
