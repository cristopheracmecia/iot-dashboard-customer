import {FC} from "react";
import * as yup from "yup";
import {useFormValidation} from "../../../hooks/Validation";
import {Button, Form, Input} from "antd";
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type PasswordRecoveryFormData = {
    password: string;
    passwordConfirmation: string;
};

type Props = {
    onSubmit: (data: PasswordRecoveryFormData) => void;
};

export const PasswordRecoveryForm: FC<Props> = ({onSubmit}) => {
    const {updateData, errors, valid, formData} =
        useFormValidation<PasswordRecoveryFormData>(
            yup.object({
                password: yup
                    .string()
                    .required("Escriba una nueva contraseña.")
                    .min(8, "La contraseña debe contener al menos 8 caracteres."),
                passwordConfirmation: yup
                    .string()
                    .oneOf(
                        [yup.ref("password"), undefined],
                        "Ambas contraseñas deben coincidir."
                    ),
            }),
            {password: "", passwordConfirmation: ""}
        );

    return (
        <Form
            onFinish={(_) => {
                if (valid) onSubmit(formData);
            }}
        >
            <Form.Item label="Nueva contraseña" status={!!errors.password ? "error" : "validating"}
                       help={errors.password}>
                <Input.Password
                    required
                    id="password"
                    autoFocus
                    onChange={updateData}
                    value={formData.password}
                />
            </Form.Item>
            <Form.Item label="Repetir contraseña" status={!!errors.passwordConfirmation ? "error" : "validating"}
                       help={errors.passwordConfirmation}>
                <Input.Password
                    required
                    id="passwordConfirmation"
                    onChange={updateData}
                    value={formData.passwordConfirmation}
                />
            </Form.Item>

            <Button
                type={"primary"}
                htmlType={"submit"}
                block
                disabled={!valid}
                icon={<FontAwesomeIcon icon={faCheck}/>}
            >
                Confirmar
            </Button>
        </Form>
    );
};
