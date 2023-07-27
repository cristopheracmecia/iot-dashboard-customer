import {FC} from "react";
import * as yup from "yup";
import {useFormValidation} from "../../../hooks/Validation";
import {PasswordRecoveryRequestData} from "../../../../types/User";
import {Button, Form, Input} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faAt} from "@fortawesome/free-solid-svg-icons";

type Props = {
    onSubmit: (values: PasswordRecoveryRequestData) => void;
};

export const PasswordRecoveryPageForm: FC<Props> = ({onSubmit}) => {
    const {updateData, errors, valid, formData} =
        useFormValidation<PasswordRecoveryRequestData>(
            yup.object({
                email: yup
                    .string()
                    .required("Ingresa un email")
                    .email("Ingresa un email válido"),
            }),
            {email: ""}
        );
    return (
        <Form
            component="form"
            noValidate
            onFinish={(_) => {
                if (valid) onSubmit(formData);
            }}
            className={"mt-1"}
        >
            <Form.Item label={"Correo electrónico"} validateStatus={errors.email ? "error" : "validating"}
                       help={errors.email}>
                <Input
                    required
                    id="email"
                    autoComplete="email"
                    autoFocus
                    onChange={updateData}
                    value={formData.email}
                    prefix={<FontAwesomeIcon icon={faAt}/>}
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType={"submit"}
                disabled={!valid}
                icon={<FontAwesomeIcon icon={faPaperPlane}/>}
                block
            >
                Enviar
            </Button>
        </Form>
    );
};
