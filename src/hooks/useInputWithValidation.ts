import { useState } from "react";

export const useInputWithValidation = (
  initialValue: string,
  validate: (value: string) => boolean
) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsValid(validate(e.target.value));
  };

  return {
    value,
    setValue,
    isValid,
    handleValueChange,
  };
};
