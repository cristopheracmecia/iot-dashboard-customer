import {FC} from "react";
import {Form, Input, Modal, Typography} from "antd";
import {Role, UpdateRoleFormData} from "../../../../types/Role";
import {handleTextAreaEvent, useFormValidation} from "../../../hooks/Validation";
import * as yup from "yup"

type Props = {
    onClose: () => void
    item: Role
    onUpdate: (data: UpdateRoleFormData) => void
}

export const UpdateRoleModal: FC<Props> = ({onClose, item, onUpdate}) => {
    const {updateData, formData, errors, valid} = useFormValidation<UpdateRoleFormData>(yup.object({
        description: yup.string(),
        reason: yup.string().required("Es necesario especificar el motivo.").min(10, "Se requieren al menos 10 caracteres.")
    }), {
        reason: "",
        description: item.description
    })

    function onFinish() {
        if (valid) onUpdate(formData)
    }

    return <Modal open={true} title={"Actualizar"} onCancel={onClose} onOk={onFinish} okButtonProps={{
        disabled: !valid,
        type: "primary"
    }}>
        <Form>
            <Form.Item>
                <Typography.Paragraph>
                    Complete los siguientes campos para actualizar el rol de usuario:
                    <br/>
                    <span className={"font-semibold"}>Nombre: {item.label}</span>
                    <br/>
                    <span className={"font-semibold"}>ID: {item.id}</span>
                </Typography.Paragraph>
            </Form.Item>
            <Form.Item label={"Descripción"} validateStatus={errors.description ? "error" : "validating"}
                       help={errors.description}>
                <Input.TextArea allowClear id={"description"}
                                placeholder={"Descripción"} value={formData.description}
                                onChange={handleTextAreaEvent(updateData)}/> </Form.Item>
            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason}>
                <Input.TextArea allowClear id={"reason"}
                                placeholder={"Motivo"} value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)}/> </Form.Item>
        </Form>
    </Modal>
}