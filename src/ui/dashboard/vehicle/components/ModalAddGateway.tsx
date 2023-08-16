import {FC, useState} from "react";
import {Form, Input, Modal, Select} from "antd";
import {handleTextAreaEvent, useFormValidation} from "../../../hooks/Validation";
import * as yup from "yup"
import {Vehicle} from "../../../../types/Vehicle";
import {Gateway, UpdateGatewayFormData} from "../../../../types/Gateway";

type Props = {
    gatewayList?: Array<Gateway> | null
    onFinish: (gatewayId: number, data: UpdateGatewayFormData) => void
    onCancel: () => void
    vehicle: Vehicle
}

export const AddVehicleGatewayModal: FC<Props> = ({gatewayList, onFinish, vehicle, onCancel}) => {
    const {valid, formData, errors, updateData} = useFormValidation<UpdateGatewayFormData>(yup.object({
        vehicleId: yup.number().required("El vehículo es requerido"),
        reason: yup.string().required("Es necesario especificar por qué asigna este gateway a este vehículo.").min(16, "Detalle el cambio a realizar con al menos 16 caracteres."),
    }), {
        vehicleId: vehicle.id,
        reason: ""
    })
    const [selectedGateway, setSelectedGateway] = useState<number | null>(null)
    const onSubmit = () => {
        if (valid && !!selectedGateway) onFinish(selectedGateway, formData)
    }

    return (
        <Modal open={true} title={"Añadir gateway"} onCancel={onCancel} okButtonProps={{
            disabled: !valid || !selectedGateway
        }} onOk={onSubmit}>
            <Form.Item label={"Seleccione un gateway"} status={!selectedGateway ? "error" : "validating"}
                       help={!selectedGateway ? "Selecciona un gateway" : null}>
                <Select fieldNames={{
                    label: "key",
                    value: "id"
                }} options={gatewayList as any} title={"Gateway"} placeholder={"Seleccione un gateway"}
                        onChange={setSelectedGateway} value={selectedGateway}/>
            </Form.Item>
            <Form.Item label={"Detalles"} status={errors.reason ? "error" : "validating"} help={errors.reason}>
                <Input.TextArea name={"reason"} placeholder={"Detalle el cambio a realizar."}
                                onChange={handleTextAreaEvent(updateData)} value={formData.reason}/>
            </Form.Item>
        </Modal>
    )
}