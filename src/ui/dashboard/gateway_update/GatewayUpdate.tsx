import {FC, Fragment, useEffect, useState} from "react";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {GatewayUpdateForm} from "./components/Form";
import {DashboardStateContainer} from "../../components/DashboardStateContainer";
import {AppLoader} from "../../components/AppLoader";
import {EmptyData} from "../../components/Empty";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Form, Input, Modal, notification, Typography} from "antd";
import {handleTextAreaEvent, useFormValidation} from "../../hooks/Validation";
import * as Yup from "yup";
import {useGatewayViewModel} from "../../../viewmodel/Gateway";
import {Gateway} from "../../../types/Gateway";

export const DashboardGatewayUpdatePage: FC = () => {
    const navigate = useNavigate();
    const {
        gateway,
        updateGateway,
        updateGatewayState,
        onUpdateGatewayStateReceived,
        onFetchGatewayStateReceived,
        fetchGateway,
        fetchGatewayState,
    } = useGatewayViewModel();
    const {id} = useParams();
    const [reasonVisible, setReasonVisible] = useState<boolean>(false);
    const [toUpdateData, setToUpdateData] = useState<Partial<Gateway>>();
    const {updateData, formData, errors, valid} = useFormValidation<{
        reason: string;
    }>(
        Yup.object({
            reason: Yup.string()
                .required(
                    "Se requiere información sobre el reciente cambio realizado en la plataforma.",
                )
                .min(16, "Se requieren al menos 16 caracteres."),
        }),
        {reason: ""},
    );
    useEffect(() => {
        void fetchGateway(Number(id));
    }, []);


    useEffect(() => {
        if (!!fetchGatewayState && !fetchGatewayState.loading) {
            if (fetchGatewayState.hasError) {
                notification.error({
                    message:
                        fetchGatewayState.error?.message || "Error al obtener el gateway.",
                });
            }
            onFetchGatewayStateReceived();
        }
    }, [fetchGatewayState]);

    useEffect(() => {
        if (!!updateGatewayState && !updateGatewayState.loading) {
            if (updateGatewayState.hasError) {
                notification.error({
                    message:
                        updateGatewayState.error?.message || "Error al actualizar el gateway.",
                });
            } else {
                notification.success({
                    message: "Gateway actualizado con éxito",
                });
                navigate(-1);
            }
            onUpdateGatewayStateReceived();
        }
    }, [updateGatewayState]);

    const onSubmitAll = () => {
        if (toUpdateData && formData && valid) {
            void updateGateway({...toUpdateData, ...formData});
        } else setReasonVisible(true);
    };

    return (
        <DashboardStateContainer
            state={fetchGatewayState}
            className={"w-full h-full overflow-hidden"}
        >
            <AppLoader
                loading={
                    (!!fetchGatewayState && fetchGatewayState.loading) ||
                    (!!updateGatewayState && updateGatewayState.loading)
                }
            />
            <DashboardSubpageHeader title={"Gateway"} subtitle={gateway?.description}/>
            <div
                className={
                    "w-full h-full overflow-y-auto flex flex-row justify-center items-start"
                }
            >
                <div className={"max-w-full w-full p-2"}>
                    {
                        gateway?.Vehicle ? <Alert className={"mb-3"} showIcon type={"info"} message={
                            <Fragment>
                                Este gateway está asociado al vehículo con placa: {gateway.Vehicle.plate}
                                <Link to={`/dashboard/vehicles/${gateway.Vehicle.id}`} className={"m-1"}>
                                    <Typography.Link> Ver vehículo</Typography.Link>
                                </Link>
                            </Fragment>
                        }/> : null
                    }
                    {gateway ? (
                        <GatewayUpdateForm
                            gateway={gateway}
                            onFinish={(data) => {
                                setToUpdateData(data);
                                onSubmitAll();
                            }}
                        />
                    ) : (
                        <EmptyData description={"Gateway no encontrado"} title={"Error"}/>
                    )}
                </div>
            </div>
            {reasonVisible && (
                <Modal
                    open={true}
                    onCancel={() => setReasonVisible(false)}
                    title={"Actualizar Gateway"}
                    destroyOnClose
                    onOk={onSubmitAll}
                >
                    <Typography.Paragraph>
                        Por favor, detalle por qué está actualizando la información del
                        gateway.
                    </Typography.Paragraph>
                    <Form.Item
                        label={"Detalles"}
                        status={errors.reason ? "error" : "validating"}
                        help={errors.reason}
                    >
                        <Input.TextArea
                            name={"reason"}
                            value={formData.reason}
                            onChange={handleTextAreaEvent(updateData)}
                            status={errors.reason ? "error" : undefined}
                        />
                    </Form.Item>
                </Modal>
            )}
        </DashboardStateContainer>
    );
};
