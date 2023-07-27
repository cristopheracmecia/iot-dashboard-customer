import {FC, useEffect, useState} from "react";
import {Button, Avatar, Typography, Form, Input, Checkbox} from "antd"
import AcmeIcon from "../../../../assets/AICON.png";
import * as yup from "yup";
import {useFormValidation} from "../../../hooks/Validation";
import {LoginData} from "../../../../types/User";
import useCookie from "react-use-cookie";
import {Link as RouterLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt} from "@fortawesome/free-solid-svg-icons"

type Props = {
    onSubmit: (values: LoginData) => void;
};

export const AuthPageForm: FC<Props> = ({onSubmit}) => {
    const [rememberMeCookie, setRememberMeCookie] = useCookie(
        "rememberMe",
        "false"
    );
    const [rememberMe, setRememberMe] = useState<boolean>(
        rememberMeCookie === "true"
    );

    useEffect(() => {
        setRememberMe(rememberMeCookie === "true");
    }, [rememberMeCookie]);

    const {updateData, errors, valid, formData} = useFormValidation<LoginData>(
        yup.object({
            email: yup
                .string()
                .required("Ingresa un email")
                .email("Ingresa un email válido"),
            password: yup.string().required("Ingresa una contraseña"),
        }),
        {email: "", password: ""}
    );
    return (
        <div
            className={"flex flex-col justify-center items-center content-center w-full h-full p-4"}
        >
            <div className={"w-full h-full sm:max-w-md flex flex-col justify-center items-center content-center"}
            >
                <Avatar size={64} icon={<img src={AcmeIcon} alt={"ACME"}/>} style={{background: "transparent"}}/>
                <Typography.Title level={3}>
                    Iniciar Sesión
                </Typography.Title>
                <Form
                    layout={"vertical"}
                    onFinish={() => {
                        if (valid) onSubmit(formData);
                    }}
                    className={"w-full"}
                >
                    <Form.Item label={"Correo Electrónico"} validateStatus={errors.email ? "error" : "validating"}
                               help={errors.email}>
                        <Input allowClear prefix={<FontAwesomeIcon icon={faAt}/>} id={"email"}
                               placeholder={"Correo Electrónico"} value={formData.email}
                               onChange={updateData}/>
                    </Form.Item>
                    <Form.Item label={"Contraseña"} validateStatus={errors.password ? "error" : "validating"}
                               help={errors.password}>
                        <Input.Password allowClear id={"password"} placeholder={"Contraseña"} value={formData.password}
                                        onChange={updateData}/>
                    </Form.Item>

                    <Form.Item>
                        <Checkbox checked={rememberMe} onChange={(e) => {
                            setRememberMeCookie(String(e.target.checked));
                        }}>
                            Mantener sesión iniciada
                        </Checkbox>
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType={"submit"}
                        disabled={!valid}
                        className={"w-full"}
                    >
                        Iniciar Sesión
                    </Button>
                </Form>

                <RouterLink to={"/recover-password"} className={"no-underline mt-4"}>
                    <Typography.Text className="text-primary" underline={false}>
                        ¿Olvidaste tu contraseña? Click aquí
                    </Typography.Text>
                </RouterLink>
                <Typography.Text type={"secondary"}
                                 className={"mt-4"}
                >
                    ACME & CIA 2023
                </Typography.Text>
            </div>

        </div>
    );
};
