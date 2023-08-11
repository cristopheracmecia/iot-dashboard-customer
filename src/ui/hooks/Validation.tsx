import {useState, ChangeEvent} from "react";
import * as yup from "yup";
import {Dayjs} from "dayjs";

export function useFormValidation<T, E = T>(
    schema: yup.Schema,
    initialData: T
) {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState<E>({} as any);
    const [valid, setIsValid] = useState(false);
    const updateData = (id: string, value: any) => {
        const newData = {...formData, [id]: value};
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

type CbType = (id: string, value: any)=>void
export function handleInputEvent(cb1: CbType) {
    return (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name || e.target.id
        cb1(name, e.target.value)
    }
}

export function handleTextAreaEvent(cb1: CbType) {
    return (e: ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.name || e.target.id
        cb1(name, e.target.value)
    }
}
export function handleValueChange(cb1: CbType, id: string){
    return (value: any) => {
        cb1(id, value)
    }
}

export function handleDatePickerEvent(cb1: CbType, id: string) {
    return (value: Dayjs| null) => {
        cb1(id, value?.toDate()?.valueOf())
    }
}