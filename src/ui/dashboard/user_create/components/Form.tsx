import {FC} from "react";
import {Form, Input} from "antd";
import {useFormValidation} from "../../../hooks/Validation";
import {LoginData, NewUserData} from "../../../../types/User";
import * as yup from "yup";

type Props = {

}

export const UserCreateForm : FC<Props> = ({}) => {
    const {updateData, errors, valid, formData} = useFormValidation<NewUserData>(
        yup.object({
            email: yup
                .string()
                .required("Ingresa un email")
                .email("Ingresa un email válido"),
            password: yup.string().required("Ingresa una contraseña"),
            corporateEmail: yup
                .string()
                .required("Ingresa un email")
                .email("Ingresa un email válido"),
            dni: yup.string().required("Ingresa un número de DNI.").length(8, "Ingrese un número de DNI válido."),
            name: yup.string().min(3, "Ingrese un nombre válido."),
            lastname: yup.string().min(3, "Ingrese un apellido válido."),
            username: yup.string().required(),
            birthDate: yup.number().required(),
            roleId: yup.number().required()
        }),
        {
            email: "", corporateEmail: "", dni: "", name: "", lastname: "", username: "", password: ""
        }
    );

    return <Form>
        <Form.Item>
            <Input />
        </Form.Item>
    </Form>
}