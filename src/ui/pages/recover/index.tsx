import {FC, Fragment, useCallback, useEffect, useState} from "react";
import {useSearchParams, NavLink as RouterLink} from "react-router-dom";
import {
    Avatar,
    Card, Typography
    , Spin, Layout
} from "antd";
import AcmeIcon from "../../../assets/AICON.png";
import {usePasswordResetViewModel} from "../../../viewmodel/PasswordReset";
import {toast} from "react-toastify";
import {
    PasswordRecoveryForm,
    PasswordRecoveryFormData,
} from "./components/Form";
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AppLoader} from "../../components/AppLoader";

export const PasswordRecoveryValidationPage: FC = () => {
    const [params] = useSearchParams();
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
    const [passwordUpdated, setPasswordUpdated] = useState<boolean | null>(null);
    const {
        onProceedChangeStateReceived,
        onValidationStateReceived,
        proceedChangeState,
        proceedPasswordReset,
        validateToken,
        validationState,
    } = usePasswordResetViewModel();

    useEffect(() => {
        if (!!validationState && !validationState.loading) {
            if (validationState.hasError) {
                toast.error("El url no es válido.");
            } else {
                setIsTokenValid(true);
            }
            onValidationStateReceived();
        }
    }, [validationState]);

    useEffect(() => {
        if (!!proceedChangeState && !proceedChangeState.loading) {
            if (proceedChangeState.hasError) {
                toast.error("Ha ocurrido un error al actualizar su contraseña.");
                setPasswordUpdated(false);
            } else {
                toast.success("Su contraseña se ha actualizado.");
                setPasswordUpdated(true);
            }
            onProceedChangeStateReceived();
        }
    }, [proceedChangeState]);

    useEffect(() => {
        if (validationState === null) {
            void validateToken({
                token: params.get("tt") as string,
                userId: Number.parseInt(params.get("userId") as string),
            });
        }
    }, []);

    const updatePassword = useCallback((data: PasswordRecoveryFormData) => {
        proceedPasswordReset({
            token: params.get("tt") as string,
            userId: Number.parseInt(params.get("userId") as string),
            password: data.password,
            passwordRepeat: data.passwordConfirmation,
        });
    }, []);

    return (
        <Layout
            className="overflow-hidden w-full h-full flex justify-center lg:items-center"
        >
            <AppLoader loading={(!!proceedChangeState && proceedChangeState.loading) && (!!validationState && validationState.loading)}/>
            <Card bordered={false} className="md:w-full md:max-w-lg"
            >
                <div
                    className="lg:max-w-lg py-6 flex flex-col justify-center items-center">
                    <Avatar size={64} icon={<img src={AcmeIcon} alt={"ACME"}/>} style={{background: "transparent"}}/>
                    {validationState?.loading || proceedChangeState?.loading ? (
                        <Spin/>
                    ) : isTokenValid ? (
                        passwordUpdated === null ? (
                            <Fragment>
                                <Typography.Title level={3}>Actualizar contraseña</Typography.Title>
                                <PasswordRecoveryForm onSubmit={updatePassword}/>
                            </Fragment>
                        ) : passwordUpdated ? (
                            <Fragment>
                                <Typography.Title level={3}>Contraseña actualizada</Typography.Title>
                                <Typography.Text>
                                    Su contraseña ha sido actualizada, ya puede iniciar sesión.
                                </Typography.Text>
                                <Typography.Text type={"success"}>
                                    <FontAwesomeIcon icon={faCheck} className={"text-4xl"}/>
                                </Typography.Text>
                                <RouterLink to={"/auth"}>
                                    <Typography.Text className="text-primary no-underline">
                                        Iniciar Sesión
                                    </Typography.Text>
                                </RouterLink>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Typography.Title level={3}>Ha ocurrido un error</Typography.Title>
                                <Typography.Text>
                                    Ha ocurrido un error o el url ingresado no es válido. Por favor,
                                    realice la solicitud nuevamente.
                                </Typography.Text>
                            </Fragment>
                        )
                    ) : (
                        <Fragment>
                            <Typography.Title level={3}>Url no válido</Typography.Title>
                            <Typography.Text>
                                El url no está disponible, venció o no existe. Por favor, vuelva a
                                realizar la solicitud.
                            </Typography.Text>
                        </Fragment>
                    )}

                    <Typography.Text type={"secondary"}
                                     className={"mt-4"}
                    >
                        ACME & CIA 2023
                    </Typography.Text>
                </div>
            </Card>
        </Layout>
    );
};
