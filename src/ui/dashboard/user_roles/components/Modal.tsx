import {FC} from "react";
import {Form, Input, Modal} from "antd";
import {handleInputEvent, handleTextAreaEvent, useFormValidation} from "../../../hooks/Validation";
import * as yup from "yup"
import {NewRoleFormData} from "../../../../types/Role";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";

type Props = {
    open: boolean
    onClose: () => void
    onFinish: (data: NewRoleFormData) => void
}
export const CreateRoleModal: FC<Props> = ({open, onClose, onFinish}) => {
    const {errors, updateData, formData, valid} = useFormValidation<NewRoleFormData>(yup.object({
        label: yup.string().required("Es necesario especificar el nombre.").min(6, "Se necesita un mínimo de 6 caracteres."),
        description: yup.string(),
        reason: yup.string().required("Es necesario especificar el motivo de creación del rol.").min(10, "Se necesitan al menos 10 caracteres.")
    }), {
        label: "",
        description: "",
        reason: ""
    })

    const onDone = () => {
        if (valid) onFinish(formData)
    }

    return <Modal open={open} onCancel={onClose} title={"Nuevo Rol de Usuario"} onOk={onDone}
                  okButtonProps={
                      {
                          disabled: !valid,
                          type: "primary"
                      }
                  }>
        <Form>
            <Form.Item label={"Nombre"} validateStatus={errors.label ? "error" : "validating"}
                       help={errors.label}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faTag}/>} id={"label"}
                       placeholder={"Nombre"} value={formData.label}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"Descripción"} validateStatus={errors.description ? "error" : "validating"}
                       help={errors.description}>
                <Input.TextArea allowClear id={"description"}
                                placeholder={"Descripción (ej. Finalidad, Permisos)"} value={formData.description}
                                onChange={handleTextAreaEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason}>
                <Input.TextArea allowClear id={"reason"}
                                placeholder={"Motivo"} value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)}/>
            </Form.Item>
        </Form>
    </Modal>
}