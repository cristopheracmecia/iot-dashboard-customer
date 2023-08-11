import {FC, useEffect, useState} from "react";
import {Alert, Button, DatePicker, Form, Input, Select} from "antd";
import {
    handleDatePickerEvent,
    handleInputEvent, handleTextAreaEvent,
    handleValueChange,
    useFormValidation
} from "../../../hooks/Validation";
import {NewUserFormData} from "../../../../types/User";
import * as yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faICursor, faIdCard, faAt, faKey, faUserGear} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs"
import {Role} from "../../../../types/Role";

type Props = {
    userRoleList?: Role[]
    onFinish: (data: NewUserFormData) => void
}

export const UserCreateForm: FC<Props> = ({userRoleList, onFinish}) => {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | undefined>()

    const {updateData, errors, valid, formData} = useFormValidation<NewUserFormData>(
        yup.object({
            email: yup
                .string()
                .email("Ingresa un email válido"),
            password: yup.string().required("Ingresa una contraseña").min(8, "La contraseña necesita al menos 8 caracteres."),
            corporateEmail: yup
                .string()
                .required("Ingresa un email")
                .email("Ingresa un email válido"),
            dni: yup.string().required("Ingresa un número de DNI.").length(8, "Ingrese un número de DNI válido.").matches(/^(0|1)?\d{8}$/, "Ingrese un DNI válido."),
            name: yup.string().min(3, "Ingrese un nombre válido."),
            lastname: yup.string().min(3, "Ingrese un apellido válido."),
            username: yup.string().required("Es necesario un nombre de usuario.").min(6, "Es necesario al menos 6 caracteres."),
            birthDate: yup.number().required("Es necesario registrar la fecha de nacimiento."),
            roleId: yup.number().required("Es necesario especificar un rol para el usuario."),
            reason: yup.string().required("Especifique el motivo porque registra al nuevo usuario.").min(16, "Debe contener al menos 16 caracteres.")
        }),
        {
            corporateEmail: "", dni: "", name: "", lastname: "", username: "", password: "", reason: ""
        }
    );

    const onFormSubmit = () => {
        if (valid) onFinish(formData)
    }

    useEffect(() => {
        setSelectedDate(dayjs(formData.birthDate))
    }, [formData.birthDate])

    return <div className={"w-full h-full"}>
        <Form autoComplete={"off"} layout={"vertical"}>
            <Form.Item label={"Nombre(s)"} validateStatus={errors.name ? "error" : "validating"}
                       help={errors.name}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faICursor}/>} id={"name"}
                       placeholder={"Nombre(s)"} value={formData.name}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"Apellido(s)"} validateStatus={errors.lastname ? "error" : "validating"}
                       help={errors.lastname}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faICursor}/>} id={"lastname"}
                       placeholder={"Apellido(s)"} value={formData.lastname}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"Documento - DNI"} validateStatus={errors.dni ? "error" : "validating"}
                       help={errors.dni}>
                <Input onChange={handleInputEvent(updateData)} prefix={<FontAwesomeIcon icon={faIdCard}/>}
                       id={"dni"}
                       placeholder={"N° DNI"} value={formData.dni}
                />
            </Form.Item>
            <Form.Item label={"Correo Coorporativo"} validateStatus={errors.corporateEmail ? "error" : "validating"}
                       help={errors.corporateEmail}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faAt}/>} id={"corporateEmail"}
                       placeholder={"Correo Coorporativo"} value={formData.corporateEmail}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Correo Secundario"} validateStatus={errors.email ? "error" : "validating"}
                       help={errors.email}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faAt}/>} id={"email"}
                       placeholder={"Correo Secundario"} value={formData.email}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Nombre de Usuario"} validateStatus={errors.username ? "error" : "validating"}
                       help={errors.username}>
                <Input autoComplete={"off"} allowClear prefix={<FontAwesomeIcon icon={faICursor}/>} id={"username"}
                       placeholder={"CNombre de Usuario"} value={formData.username}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Contraseña"} validateStatus={errors.password ? "error" : "validating"}
                       help={errors.password}>
                <Input.Password allowClear autoComplete={"off"} prefix={<FontAwesomeIcon icon={faKey}/>} id={"password"}
                                placeholder={"Contraseña"} value={formData.password}
                                onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label="Fecha de Nacimiento" validateStatus={errors.birthDate ? "error" : "validating"}
                       help={errors.birthDate}>
                <DatePicker id={"birthDate"} value={selectedDate}
                            onChange={handleDatePickerEvent(updateData, "birthDate")}/>
            </Form.Item>

            <Form.Item label={"Rol de Usuario"} validateStatus={errors.roleId ? "error" : "validating"}
                       help={errors.roleId}>
                <Select placeholder={"Seleccione un rol de usuario"} suffixIcon={<FontAwesomeIcon icon={faUserGear}/>} options={userRoleList} value={formData.roleId}
                        fieldNames={{
                            label: "label", value: "id"
                        }} onSelect={handleValueChange(updateData, "roleId")}/>
            </Form.Item>

            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason} extra={<Alert showIcon type={"warning"} message={"El cambio realizado quedará registrado"}/>}>
                <Input.TextArea allowClear autoComplete={"off"} id={"reason"}
                                placeholder={"Especifique el motivo por el que crea el nuevo usuario"}
                                value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)} showCount/>
            </Form.Item>
        </Form>
        <div className={"w-full sticky bottom-0 left-0 bg-transparent"}>
            <Button className={"mt-4"} onClick={onFormSubmit} type={"primary"} disabled={!valid}
                    icon={<FontAwesomeIcon icon={faSave}/>}>Registrar Usuario</Button>
        </div>
    </div>
}