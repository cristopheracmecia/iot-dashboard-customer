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
    const newData = { ...formData, [e.target.name || e.target.id]: e.target.value };
    setFormData(newData);

    try {
      schema.validateSync(newData, {
        recursive: true,
        abortEarly: false,
      });
      setIsValid(true);
      setErrors({} as any);
    } catch (e: unknown) {
      const error = e as yup.ValidationError;
      const errorMap = {} as any;
      error.inner.forEach((value) => {
        errorMap[value.path as string] = value.message;
      });
      setErrors(errorMap);
      setIsValid(false);
    }
  };
  const resetData = () => {
    setFormData(initialData);
  };
  return {
    updateData,
    errors,
    formData,
    valid,
    resetData,
  };
}
