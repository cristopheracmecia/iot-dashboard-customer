import { useState, ChangeEventHandler } from "react";
import * as yup from "yup";

export function useFormValidation<T, E = T>(
  schema: yup.Schema,
  initialData: T
) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<E>({} as any);
  const [valid, setIsValid] = useState(false);
  const updateData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((old) => {
      const newData = { ...old, [e.target.name]: e.target.value };
      schema
        .validate(newData, {
          recursive: true,
          abortEarly: false,
        })
        .then(() => {
          setIsValid(true);
          setErrors({} as any);
        })
        .catch((e: yup.ValidationError) => {
          const errorMap = {} as any;
          e.inner.forEach((value) => {
            errorMap[value.path as string] = value.message;
          });
          setErrors(errorMap);
          setIsValid(false);
        });
      return newData;
    });
  };
  return {
    updateData,
    errors,
    formData,
    valid,
  };
}
