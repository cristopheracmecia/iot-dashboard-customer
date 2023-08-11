import {FC} from "react";
import {Button, Form, Input} from "antd";
import {
    handleInputEvent, handleTextAreaEvent,
    useFormValidation
} from "../../../hooks/Validation";
import * as yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faMapLocationDot, faMapPin, faGlobe, faBuilding} from "@fortawesome/free-solid-svg-icons";
import {NewCustomerFormData} from "../../../../types/Customer";

type Props = {
    onFinish: (data: NewCustomerFormData) => void
}
export const CustomerCreateForm: FC<Props> = ({onFinish}) => {

    const {updateData, errors, valid, formData} = useFormValidation<NewCustomerFormData>(
        yup.object({
            businessName: yup
                .string()
                .required("Ingresa la razón social de la empresa.")
                .min(3, "Ingrese una razón social válida."),
            // @ts-ignore
            ruc: yup.string().required("Ingresa el ruc de la empresa.").min(11, "Ingrese un ruc válido."),
            subdomain: yup.string().required("Ingresa el subdominio de la empresa.").min(3, "Ingrese un subdominio válido."),
            reason: yup.string().required("Ingresa el motivo de creación de este cliente.").min(16, "Se necesitan al menos 16 caracteres."),
        }),
        {
            businessName: "", ruc: "", subdomain: "", reason: ""
        }
    );

    const onFormSubmit = () => {
        if (valid) onFinish(formData)
    }

    return <div className={"w-full h-full"}>
        <Form autoComplete={"off"} layout={"vertical"}>
            <Form.Item label={"Razón social"} validateStatus={errors.businessName ? "error" : "validating"}
                       help={errors.businessName}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faBuilding}/>} id={"businessName"}
                       placeholder={"Razón social"} value={formData.businessName}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"RUC"} validateStatus={errors.ruc ? "error" : "validating"}
                       help={errors.ruc}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faBuilding}/>} id={"ruc"}
                       placeholder={"RUC"} value={formData.ruc}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>
            <Form.Item label={"Dirección"} validateStatus={errors.address ? "error" : "validating"}
                       help={errors.address}>
                <Input onChange={handleInputEvent(updateData)} prefix={<FontAwesomeIcon icon={faMapLocationDot}/>}
                       id={"address"}
                       placeholder={"Dirección"} value={formData.address}
                />
            </Form.Item>
            <Form.Item label={"Código postal"} validateStatus={errors.postalCode ? "error" : "validating"}
                       help={errors.postalCode}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faMapPin}/>} id={"postalCode"}
                       placeholder={"Código postal"} value={formData.postalCode}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Subdominio"} validateStatus={errors.subdomain ? "error" : "validating"}
                       help={errors.subdomain}>
                <Input allowClear prefix={<FontAwesomeIcon icon={faGlobe}/>} id={"subdomain"}
                       placeholder={"Subdominio"} value={formData.subdomain}
                       onChange={handleInputEvent(updateData)}/>
            </Form.Item>

            <Form.Item label={"Motivo"} validateStatus={errors.reason ? "error" : "validating"}
                       help={errors.reason}>
                <Input.TextArea allowClear autoComplete={"off"} id={"reason"}
                                placeholder={"Especifique el motivo por el que crea el nuevo cliente"}
                                value={formData.reason}
                                onChange={handleTextAreaEvent(updateData)} showCount/>
            </Form.Item>
        </Form>
        <div className={"w-full sticky bottom-0 left-0 bg-transparent"}>
            <Button onClick={onFormSubmit} type={"primary"} disabled={!valid}
                    icon={<FontAwesomeIcon icon={faSave}/>}>Registrar Cliente</Button>
        </div>
    </div>
}