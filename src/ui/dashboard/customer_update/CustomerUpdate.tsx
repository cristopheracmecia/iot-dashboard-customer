import { FC, useEffect, useState } from "react";
import { DashboardSubpageHeader } from "../../components/DashboardHeader";
import { CustomerUpdateForm } from "./components/Form";
import { DashboardStateContainer } from "../../components/DashboardStateContainer";
import { AppLoader } from "../../components/AppLoader";
import { EmptyData } from "../../components/Empty";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Modal, notification, Typography } from "antd";
import { handleTextAreaEvent, useFormValidation } from "../../hooks/Validation";
import * as Yup from "yup";
import { useCustomerViewModel } from "../../../viewmodel/Customer";
import { Customer } from "../../../types/Customer";
export const DashboardCustomerUpdatePage: FC = () => {
  const navigate = useNavigate();
  const {
    customer,
    updateCustomer,
    updateCustomerState,
    onUpdateCustomerStateReceived,
    onFetchCustomerStateReceived,
    fetchCustomer,
    fetchCustomerState,
  } = useCustomerViewModel();
  const { id } = useParams();
  const [reasonVisible, setReasonVisible] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState<Partial<Customer>>();
  const { updateData, formData, errors, valid } = useFormValidation<{
    reason: string;
  }>(
    Yup.object({
      reason: Yup.string()
        .required(
          "Se req información sobre el reciente cambio realizado en la plataforma.",
        )
        .min(16, "Se requieren al menos 16 caracteres."),
    }),
    { reason: "" },
  );
  useEffect(() => {
    void fetchCustomer(Number(id));
  }, []);

  useEffect(() => {}, [updateCustomerState]);

  useEffect(() => {
    if (!!fetchCustomerState && !fetchCustomerState.loading) {
      if (fetchCustomerState.hasError) {
        notification.error({
          message:
            fetchCustomerState.error?.message || "Error al obtener el cliente",
        });
      }
      onFetchCustomerStateReceived();
    }
  }, [fetchCustomerState]);

  useEffect(() => {
    if (!!updateCustomerState && !updateCustomerState.loading) {
      if (updateCustomerState.hasError) {
        notification.error({
          message:
            updateCustomerState.error?.message ||
            "Error al actualizar el cliente",
        });
      } else {
        notification.success({
          message: "Cliente actualizado con éxito",
        });
        navigate(-1);
      }
      onUpdateCustomerStateReceived();
    }
  }, [updateCustomerState]);

  const onSubmitAll = () => {
    if (toUpdateData && formData && valid)
      void updateCustomer({ ...toUpdateData, ...formData });
    else setReasonVisible(true);
  };

  return (
    <DashboardStateContainer
      state={fetchCustomerState}
      className={"w-full h-full overflow-hidden"}
    >
      <AppLoader
        loading={
          (!!fetchCustomerState && fetchCustomerState.loading) ||
          (!!updateCustomerState && updateCustomerState.loading)
        }
      />
      <DashboardSubpageHeader title={"Actualizar Cliente"} />
      <div
        className={
          "w-full h-full overflow-y-auto flex flex-row justify-center items-start"
        }
      >
        <div className={"max-w-full w-full p-2"}>
          {customer ? (
            <CustomerUpdateForm
              customer={customer}
              onFinish={(data) => {
                setToUpdateData(data);
                onSubmitAll();
              }}
            />
          ) : (
            <EmptyData description={"Cliente no encontrado"} title={"Error"} />
          )}
        </div>
      </div>
      {reasonVisible && (
        <Modal
          open={true}
          onCancel={() => setReasonVisible(false)}
          title={"Actualizar Cliente"}
          destroyOnClose
          onOk={onSubmitAll}
        >
          <Typography.Paragraph>
            Por favor, detalle por qué está actualizando la información del
            cliente.
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
