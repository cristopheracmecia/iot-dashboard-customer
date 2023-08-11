import {FC} from "react";
import {Button, Form, Input} from "antd";
import {
    handleInputEvent, handleTextAreaEvent,
    useFormValidation
} from "../../../hooks/Validation";
import * as yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faKey} from "@fortawesome/free-solid-svg-icons";
import {NewGatewayFormData} from "../../../../types/Gateway";

type Props = {
    onFinish: (data: NewGatewayFormData) => void
}

export const GatewayCreateForm: FC<Props> = ({onFinish}) => {

    const {updateData, errors, valid, formData} = useFormValidation<NewGatewayFormData>(
        yup.object({
            key: yup.string().min(3, "Ingrese un identificador válido."),
            reason: yup.string().required("Especifique el motivo porque registra el nuevo gateway.").min(16, "Debe contener al menos 16 caracteres.")
        }),
        {
            key: "", reason: ""
        }
    );

    const onFormSubmit = () => {
        if (valid) onFinish(formData)
    }

    return <div className={"w-full h-full"}>
        <Form autoComplete={"off"} layout={"vertical"}>
            <Form.Item label={"Identificador"} validateStatus={errors.key ? "error" : "validating"}
                       help={errors.key}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faKey}/>} id={"key"}
                       placeholder={"Identificador"} value={formData.key}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Detalles"} validateStatus={errors.description ? "error" : "validating"}
                       help={errors.description}>
                <Input.TextArea autoComplete={"off"} allowClear id={"description"}
                                placeholder={"Detalles"} value={formData.description}
                                onChange={handleTextAreaEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason}>
                <Input.TextArea allowClear autoComplete={"off"} id={"reason"}
                                placeholder={"Especifique el motivo por el que registra el gateway."}
                                value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)} showCount/>
            </Form.Item>
        </Form>
        <div className={"w-full sticky bottom-0 left-0 bg-transparent"}>
            <Button onClick={onFormSubmit} type={"primary"} disabled={!valid}
                    icon={<FontAwesomeIcon icon={faSave}/>}>Registrar Gateway</Button>
        </div>
    </div>
}