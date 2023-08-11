import {FC} from "react";
import {InputCode} from "../../../components/Code";
import {faChevronLeft, faCheck, faClose} from "@fortawesome/free-solid-svg-icons"
import {handleInputEvent, useFormValidation} from "../../../hooks/Validation";
import * as yup from "yup";
import {CountDownButton} from "../../../components/CountDown";
import {PostLoginData} from "../../../../types/User";
import {Typography, Alert, Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons"
type Props = {
    onSubmit: (data: PostLoginData) => void;
    onBack: () => void;
    onResend: () => void;
};

export const AuthPagePostLoginForm: FC<Props> = ({
                                                     onBack,
                                                     onSubmit,
                                                     onResend,
                                                 }) => {
    const {updateData, errors, valid, formData, resetData} =
        useFormValidation<PostLoginData>(
            yup.object({
                code: yup
                    .string()
                    .required("Ingresa el código de verificación.")
                    .min(6, "El código debe contener 6 dígitos."),
            }),
            {code: ""}
        );
    return (
        <div
            className={"flex flex-col justify-center items-center content-center w-full h-full p-4"}
        >
            <div className={"w-full h-full sm:max-w-md flex flex-col justify-center items-center content-center"}
            >
                <Typography.Title level={3}>
                    Verificación pendiente
                </Typography.Title>
                <Typography.Text>
                    Se ha enviado un código de verificación a su correo electrónico. Ingrese
                    el código recibido a continuación y presione sobre verificar.
                </Typography.Text>
                <div className={"w-full flex flex-col justify-center items-center gap-4 my-4"}>
                    <InputCode value={formData.code} digits={6} onChange={handleInputEvent(updateData)}/>
                    {errors?.code ? <Alert message={errors.code} type={"error"} showIcon/> : null}
                    <Button
                        icon={<FontAwesomeIcon icon={faChevronLeft}/>}
                        onClick={onBack}
                        block
                    >
                        Volver
                    </Button>
                    <Button
                        icon={<FontAwesomeIcon icon={valid ? faCheck : faClose}/>}
                        disabled={!valid}
                        onClick={() => {
                            onSubmit(formData);
                            resetData();
                        }}
                        block
                        type={"primary"}
                    >
                        Verificar
                    </Button>
                    <CountDownButton
                        buttonProps={{
                            block: true,
                            icon: <FontAwesomeIcon icon={faPaperPlane}/>,
                            type: "primary",
                            ghost: true
                        }}
                        onClick={onResend}
                        disabledAtRender
                        maxSeconds={60}
                    >
                        Reenviar
                    </CountDownButton>
                </div>
            </div>

        </div>
    );
};
