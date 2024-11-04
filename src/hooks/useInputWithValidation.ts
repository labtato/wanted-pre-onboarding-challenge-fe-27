import { useEffect, useState } from "react";

export const useInputWithValidation = (
  initialValue: string,
  validate: (value: string) => boolean
) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validate(value));
  }, [setIsValid, validate, value]);

  return {
    value,
    setValue,
    isValid,
  };
};
