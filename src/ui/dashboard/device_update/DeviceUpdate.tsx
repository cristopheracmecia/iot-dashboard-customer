import { FC, useEffect, useState } from "react";
import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { DeviceUpdateForm } from "./components/Form";
import { DashboardStateContainer } from "../../components/DashboardStateContainer";
import { AppLoader } from "../../components/AppLoader";
import { EmptyData } from "../../components/Empty";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Modal, notification, Typography } from "antd";
import { handleTextAreaEvent, useFormValidation } from "../../hooks/Validation";
import * as Yup from "yup";
import { useDeviceViewModel } from "../../../viewmodel/Device";
import { Device } from "../../../types/Device";
import { useUnitViewModel } from "../../../viewmodel/Unit";

export const DashboardDeviceUpdatePage: FC = () => {
  const navigate = useNavigate();
  const {
    device,
    updateDevice,
    updateDeviceState,
    onUpdateDeviceStateReceived,
    onFetchDeviceStateReceived,
    fetchDevice,
    fetchDeviceState,
  } = useDeviceViewModel();
  const {
    fetchListState: fetchUnitListState,
    fetchList: fetchUnitList,
    onFetchListStateReceived: onFetchUnitListStateReceived,
    unitList,
  } = useUnitViewModel();
  const { id } = useParams();
  const [reasonVisible, setReasonVisible] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState<Partial<Device>>();
  const { updateData, formData, errors, valid } = useFormValidation<{
    reason: string;
  }>(
    Yup.object({
      reason: Yup.string()
        .required(
          "Se requiere información sobre el reciente cambio realizado en la plataforma.",
        )
        .min(16, "Se requieren al menos 16 caracteres."),
    }),
    { reason: "" },
  );
  useEffect(() => {
    void fetchUnitList();
  }, []);

  useEffect(() => {
    if (!!fetchDeviceState && !fetchDeviceState.loading) {
      if (fetchDeviceState.hasError) {
        notification.error({
          message:
            fetchDeviceState.error?.message ||
            "Error al obtener el dispositivo.",
        });
      }
      onFetchDeviceStateReceived();
    }
  }, [fetchDeviceState]);

  useEffect(() => {
    if (!!fetchUnitListState && !fetchUnitListState.loading) {
      if (fetchUnitListState.hasError) {
        notification.error({
          message:
            fetchUnitListState.error?.message ||
            "Error al obtener las unidades.",
        });
      }
      void fetchDevice(Number(id));
      onFetchUnitListStateReceived();
    }
  }, [fetchUnitListState, fetchDevice]);

  useEffect(() => {
    if (!!updateDeviceState && !updateDeviceState.loading) {
      if (updateDeviceState.hasError) {
        notification.error({
          message:
            updateDeviceState.error?.message ||
            "Error al actualizar el dispositivo.",
        });
      } else {
        notification.success({
          message: "Dispositivo actualizado con éxito",
        });
        navigate(-1);
      }
      onUpdateDeviceStateReceived();
    }
  }, [updateDeviceState]);

  const onSubmitAll = () => {
    if (toUpdateData && formData && valid) {
      void updateDevice({ ...toUpdateData, ...formData });
    } else setReasonVisible(true);
  };

  return (
    <DashboardStateContainer
      state={fetchDeviceState}
      className={"w-full h-full overflow-hidden"}
    >
      <AppLoader
        loading={
          (!!fetchDeviceState && fetchDeviceState.loading) ||
          (!!updateDeviceState && updateDeviceState.loading)
        }
      />
      <DashboardSubpageHeader
        title={"Dispositivo"}
        subtitle={device?.description}
      />
      <div
        className={"w-full h-full overflow-y-auto flex flex-row items-start"}
      >
        <div className={"max-w-full w-full p-2"}>
          {device ? (
            <DeviceUpdateForm
              device={device}
              onFinish={(data) => {
                setToUpdateData(data);
                onSubmitAll();
              }}
              unitList={unitList}
            />
          ) : (
            <EmptyData
              description={"Dispositivo no encontrado"}
              title={"Error"}
            />
          )}
        </div>
      </div>
      {reasonVisible && (
        <Modal
          open={true}
          onCancel={() => setReasonVisible(false)}
          title={"Actualizar Dispositivo"}
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
