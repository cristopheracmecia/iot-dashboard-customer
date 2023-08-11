import {FC} from "react";
import {Button, Form, Input, Select} from "antd";
import {
    handleInputEvent, handleTextAreaEvent,
    handleValueChange,
    useFormValidation
} from "../../../hooks/Validation";
import * as yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faICursor, faIdCard, faUserGear, faCar} from "@fortawesome/free-solid-svg-icons";
import {NewVehicleFormData} from "../../../../types/Vehicle";
import {Customer} from "../../../../types/Customer";

type Props = {
    customerList?: Customer[] | null
    onFinish: (data: NewVehicleFormData) => void
}

export const VehicleCreateForm: FC<Props> = ({customerList, onFinish}) => {

    const {updateData, errors, valid, formData} = useFormValidation<NewVehicleFormData>(
        yup.object({
            name: yup.string().min(3, "Ingrese un nombre válido."),
            plate: yup.string().min(7, "Ingrese una placa válida."),
            brand: yup.string().required("Es necesario especificar la marca del vehículo."),
            customerId: yup.number().required("Es necesario especificar un cliente para el vehículo."),
            reason: yup.string().required("Especifique el motivo porque registra el nuevo vehículo.").min(16, "Debe contener al menos 16 caracteres.")
        }),
        {
            name: "", plate: "", customerId: undefined, reason: "", brand: ""
        }
    );

    const onFormSubmit = () => {
        if (valid) onFinish(formData)
    }

    return <div className={"w-full h-full"}>
        <Form autoComplete={"off"} layout={"vertical"}>
            <Form.Item label={"Nombre"} validateStatus={errors.name ? "error" : "validating"}
                       help={errors.name}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faICursor}/>} id={"name"}
                       placeholder={"Nombre"} value={formData.name}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"Placa"} validateStatus={errors.plate ? "error" : "validating"}
                       help={errors.plate}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faCar}/>} id={"plate"}
                       placeholder={"Placa"} value={formData.plate}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"Marca"} validateStatus={errors.brand ? "error" : "validating"}
                       help={errors.brand}>
                <Input onChange={handleInputEvent(updateData)} prefix={<FontAwesomeIcon icon={faCar}/>}
                       id={"brand"}
                       placeholder={"Marca"} value={formData.brand}
                />
            </Form.Item>
            <Form.Item label={"Modelo"} validateStatus={errors.model ? "error" : "validating"}
                       help={errors.model}>
                <Input onChange={handleInputEvent(updateData)} prefix={<FontAwesomeIcon icon={faCar}/>}
                       id={"model"}
                       placeholder={"Modelo"} value={formData.model}
                />
            </Form.Item>

            <Form.Item label={"Detalles"} validateStatus={errors.description ? "error" : "validating"}
                       help={errors.description}>
                <Input.TextArea autoComplete={"off"} allowClear id={"description"}
                       placeholder={"Detalles"} value={formData.description}
                       onChange={handleTextAreaEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Cliente"} validateStatus={errors.customerId ? "error" : "validating"}
                       help={errors.customerId}>
                <Select placeholder={"Seleccione un cliente"} suffixIcon={<FontAwesomeIcon icon={faUserGear}/>} options={customerList || []} value={formData.customerId}
                        fieldNames={{
                            label: "businessName", value: "id"
                        }} onSelect={handleValueChange(updateData, "customerId")}/>
            </Form.Item>

            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason}>
                <Input.TextArea allowClear autoComplete={"off"} id={"reason"}
                                placeholder={"Especifique el motivo por el que crea el nuevo vehículo"}
                                value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)} showCount/>
            </Form.Item>
        </Form>
        <div className={"w-full sticky bottom-0 left-0 bg-transparent"}>
            <Button onClick={onFormSubmit} type={"primary"} disabled={!valid}
                    icon={<FontAwesomeIcon icon={faSave}/>}>Registrar Vehículo</Button>
        </div>
    </div>
}