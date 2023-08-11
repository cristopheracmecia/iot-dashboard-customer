import {FC} from "react";
import {Button, Form, Input, Select} from "antd";
import {
    handleInputEvent, handleTextAreaEvent,
    handleValueChange,
    useFormValidation
} from "../../../hooks/Validation";
import * as yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faICursor, faUserGear, faKey} from "@fortawesome/free-solid-svg-icons";
import {NewDeviceFormData} from "../../../../types/Device";
import {Unit} from "../../../../types/Unit";

type Props = {
    unitList?: Unit[] | null
    onFinish: (data: NewDeviceFormData) => void
}

export const DeviceCreateForm: FC<Props> = ({unitList, onFinish}) => {

    const {updateData, errors, valid, formData} = useFormValidation<NewDeviceFormData>(
        yup.object({
            key: yup.string().min(3, "Ingrese un identificador válido."),
            unitId: yup.number().required("Es necesario especificar una unidad para el dispositivo.."),
            reason: yup.string().required("Especifique el motivo porque registra el dispositivo.").min(16, "Debe contener al menos 16 caracteres.")
        }),
        {
            key: "", unitId: undefined, reason: ""
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
                <Input autoComplete={"off"} allowClear prefix={<FontAwesomeIcon icon={faICursor}/>} id={"description"}
                       placeholder={"Detalles"} value={formData.description}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Unidad"} validateStatus={errors.unitId ? "error" : "validating"}
                       help={errors.unitId}>
                <Select suffixIcon={<FontAwesomeIcon icon={faUserGear}/>} options={unitList || []} value={formData.unitId}
                        fieldNames={{
                            label: "name", value: "id"
                        }} onSelect={handleValueChange(updateData, "unitId")}/>
            </Form.Item>

            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason}>
                <Input.TextArea allowClear autoComplete={"off"} id={"reason"}
                                placeholder={"Especifique el motivo por el que agrega el dispositivo."}
                                value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)} showCount/>
            </Form.Item>
        </Form>
        <div className={"w-full sticky bottom-0 left-0 bg-transparent"}>
            <Button onClick={onFormSubmit} type={"primary"} disabled={!valid}
                    icon={<FontAwesomeIcon icon={faSave}/>}>Registrar Dispositivo</Button>
        </div>
    </div>
}