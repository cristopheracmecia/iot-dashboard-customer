import {FC} from "react";
import {Form, Input, Modal, Select} from "antd";
import {Device} from "../../../../types/Device";
import {NewVehicleDeviceFormData} from "../../../../types/VehicleDevice";
import {handleTextAreaEvent, handleValueChange, useFormValidation} from "../../../hooks/Validation";
import * as yup from "yup"
import {Vehicle} from "../../../../types/Vehicle";

type Props = {
    deviceList?: Array<Device> | null
    onFinish: (data: NewVehicleDeviceFormData) => void
    onCancel: () => void
    vehicle: Vehicle
}

export const AddVehicleDeviceModal: FC<Props> = ({deviceList, onFinish, vehicle, onCancel}) => {
    const {valid, formData, errors, updateData} = useFormValidation<NewVehicleDeviceFormData>(yup.object({
        deviceId: yup.number().required("Debes seleccionar un dispositivo."),
        vehicleId: yup.number().required("El vehículo es requerido"),
        reason: yup.string().required("Es necesario especificar por qué registra un nuevo dispositivo.").min(16, "Detalle el cambio a realizar con al menos 16 caracteres."),
    }), {
        vehicleId: vehicle.id,
        reason: ""
    })

    const onSubmit = () => {
       if(valid) onFinish(formData)
    }

    return (
        <Modal open={true} title={"Añadir dispositivo"} onCancel={onCancel} okButtonProps={{
            disabled: !valid
        }} onOk={onSubmit}>
            <Form.Item label={"Seleccione un dispositivo"} status={errors.deviceId ? "error" : "validating"}
                       help={errors.deviceId}>
                <Select fieldNames={{
                    label: "key",
                    value: "id"
                }} options={deviceList as any} title={"Dispositivo"} placeholder={"Seleccione un dispositivo"}
                        onChange={handleValueChange(updateData, "deviceId")} value={formData.deviceId}/>
            </Form.Item>
            <Form.Item label={"Detalles"} status={errors.reason ? "error" : "validating"} help={errors.reason}>
                <Input.TextArea name={"reason"} placeholder={"Detalle el cambio a realizar."}
                                onChange={handleTextAreaEvent(updateData)} value={formData.reason}/>
            </Form.Item>
        </Modal>
    )
}