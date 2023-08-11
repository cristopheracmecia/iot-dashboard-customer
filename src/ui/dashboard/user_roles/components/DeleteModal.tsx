import {FC} from "react";
import {Alert, Form, Input, Modal, Typography} from "antd";
import {DeleteRoleFormData, Role} from "../../../../types/Role";
import {handleTextAreaEvent, useFormValidation} from "../../../hooks/Validation";
import * as yup from "yup"

type Props = {
    onClose: () => void
    item: Role
    onDelete: (data: DeleteRoleFormData) => void
}

export const DeleteRoleModal: FC<Props> = ({onClose, item, onDelete}) => {
    const {updateData, formData, errors, valid} = useFormValidation<DeleteRoleFormData>(yup.object({
        reason: yup.string().required("Es necesario especificar el motivo.").min(16, "Se requieren al menos 16 caracteres.")
    }), {
        reason: ""
    })

    function onFinish() {
        if (valid) onDelete(formData)
    }

    return <Modal open={true} title={"Eliminar"} onOk={onFinish} okButtonProps={{
        disabled: !valid,
        type: "primary"
    }} onCancel={onClose}>
        <Form>
            <Form.Item>
                <Typography.Paragraph>
                    Complete los siguientes campos para eliminar:
                    <br/>
                    <span className={"font-semibold"}>Nombre: {item.label}</span>
                    <br/>
                    <span className={"font-semibold"}>ID: {item.id}</span>
                    <br/>
                    <Alert showIcon type={"warning"}
                           message={"Antes de realizar esta acción tenga en cuenta que podría modificar a todos los usuarios y afectar gravemente su acceso. Los permisos así como el rol de cada usuario vinculado a este rol tendrán que establecerse nuevamente."}/>
                </Typography.Paragraph>
            </Form.Item>
            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason}>
                <Input.TextArea allowClear id={"reason"}
                                placeholder={"Motivo"} value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)}/> </Form.Item>
        </Form>
    </Modal>
}