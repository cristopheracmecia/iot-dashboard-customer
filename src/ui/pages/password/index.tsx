import {FC, Fragment, useEffect, useState} from "react";
import {toast} from "react-toastify";
import AcmeIcon from "../../../assets/AICON.png";
import {PasswordRecoveryPageForm} from "./components/Form";
import {useRecoveryRequestViewModel} from "../../../viewmodel/RecoverRequest";
import {Avatar, Card, Layout, Typography} from "antd"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeCircleCheck} from "@fortawesome/free-solid-svg-icons"
import {AppLoader} from "../../components/AppLoader";

type Props = {};

export const PasswordRecoveryPage: FC<Props> = ({}) => {
    const [messageSent, setMessageSent] = useState<boolean>(false);
    const {sendRequest, requestState, onRequestStateReceived} =
        useRecoveryRequestViewModel();

    useEffect(() => {
        if (!!requestState && !requestState.loading) {
            if (requestState.hasError) {
                toast.error(requestState.error?.message);
            } else {
                setMessageSent(true);
            }
            onRequestStateReceived();
        }
    }, [requestState]);

    return (
        <Layout
            className="overflow-hidden w-full h-full flex justify-center lg:items-center"
        >
            <AppLoader loading={!!requestState && requestState.loading}/>
            <Card bordered={false}>
                <div
                    className="lg:max-w-lg py-6 flex flex-col justify-center items-center">
                    <Avatar size={64} icon={<img src={AcmeIcon} alt={"ACME"}/>} style={{background: "transparent"}}/>

                    {messageSent ? (
                        <Fragment>
                            <Typography.Title level={3}>
                                Mensaje enviado
                            </Typography.Title>
                            <Typography.Text>
                                Se ha enviado un correo electrónico detallando las instrucciones
                                para restablecer su contraseña.
                            </Typography.Text>
                            <Typography.Text className={"text-4xl text-amber-500"}>
                                <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                            </Typography.Text>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography.Title level={3}>
                                Recuperar contraseña
                            </Typography.Title>
                            <Typography.Text>
                                Te enviaremos instrucciones a tu correo electrónico. Ingresa tu
                                nombre de usuario o email a continuación:
                            </Typography.Text>

                            <PasswordRecoveryPageForm onSubmit={sendRequest}/>
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
