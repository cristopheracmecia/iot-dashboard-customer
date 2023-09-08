import {FC, useEffect, useState} from "react";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {UnitUpdateForm} from "./components/Form";
import {DashboardStateContainer} from "../../components/DashboardStateContainer";
import {AppLoader} from "../../components/AppLoader";
import {EmptyData} from "../../components/Empty";
import {useNavigate, useParams} from "react-router-dom";
import {Form, Input, Modal, notification, Typography} from "antd";
import {handleTextAreaEvent, useFormValidation} from "../../hooks/Validation";
import * as Yup from "yup";
import {Unit} from "../../../types/Unit";
import {useUnitViewModel} from "../../../viewmodel/Unit";

export const DashboardUnitUpdatePage: FC = () => {
    const navigate = useNavigate();
    const {
        unit,
        updateUnit,
        updateUnitState,
        onUpdateUnitStateReceived,
        onFetchUnitStateReceived,
        fetchUnit,
        fetchUnitState,
    } = useUnitViewModel();

    const {id} = useParams();
    const [reasonVisible, setReasonVisible] = useState<boolean>(false);
    const [toUpdateData, setToUpdateData] = useState<Partial<Unit>>();
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
        void fetchUnit(Number(id));
    }, []);


    useEffect(() => {
        if (!!fetchUnitState && !fetchUnitState.loading) {
            if (fetchUnitState.hasError) {
                notification.error({
                    message:
                        fetchUnitState.error?.message || "Error al obtener la unidad.",
                });
            }
            onFetchUnitStateReceived();
        }
    }, [fetchUnitState]);

    useEffect(() => {
        if (!!updateUnitState && !updateUnitState.loading) {
            if (updateUnitState.hasError) {
                notification.error({
                    message:
                        updateUnitState.error?.message || "Error al actualizar la unidad.",
                });
            } else {
                notification.success({
                    message: "Unidad actualizada con éxito",
                });
                navigate(-1);
            }
            onUpdateUnitStateReceived();
        }
    }, [updateUnitState]);

    const onSubmitAll = () => {
        if (toUpdateData && formData && valid) {
            void updateUnit({...toUpdateData, ...formData});
        } else setReasonVisible(true);
    };

    return (
        <DashboardStateContainer
            state={fetchUnitState}
            className={"w-full h-full overflow-hidden"}
        >
            <AppLoader
                loading={
                    (!!fetchUnitState && fetchUnitState.loading) ||
                    (!!updateUnitState && updateUnitState.loading)
                }
            />
            <DashboardSubpageHeader title={"Unidad"} subtitle={unit?.description}/>
            <div
                className={
                    "w-full h-full overflow-y-auto flex flex-row justify-center items-start"
                }
            >
                <div className={"max-w-full w-full p-2"}>
                    {unit ? (
                        <UnitUpdateForm
                            unit={unit}
                            onFinish={(data) => {
                                setToUpdateData(data);
                                onSubmitAll();
                            }}
                        />
                    ) : (
                        <EmptyData description={"Unidad no encontrada"} title={"Error"}/>
                    )}
                </div>
            </div>
            {reasonVisible && (
                <Modal
                    open={true}
                    onCancel={() => setReasonVisible(false)}
                    title={"Actualizar Unidad"}
                    destroyOnClose
                    onOk={onSubmitAll}
                >
                    <Typography.Paragraph>
                        Por favor, detalle por qué está actualizando la información del
                        dispositivo.
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
