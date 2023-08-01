import { useState, useCallback } from 'react';

const useFormValidation = () => {
  const [ values, setValues ] = useState({}),
        [ errors, setErrors ] = useState({}),
        [ isValid, setIsValid ] = useState(false),
        [ currentInputName, setCurrentInputName ] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
    setCurrentInputName(name);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    errors,
    isValid,
    setIsValid,
    currentInputName,
    handleChange,
    resetForm,
  };
};

export default useFormValidation;
