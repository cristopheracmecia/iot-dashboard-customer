import { FC } from "react";
import {
  Checkbox,
  DatePicker,
  Form,
  Modal,
  Select,
  TimeRangePickerProps,
} from "antd";
import {
  handleValueChange,
  useFormValidation,
} from "../../../hooks/Validation";
import * as yup from "yup";
import { Gateway } from "../../../../types/Gateway";
import { VehicleDevice } from "../../../../types/VehicleDevice";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  onFinish: (data: TabLogsModalFormData) => void;
  onCancel: () => void;
  gatewayList: Gateway[];
  deviceList: VehicleDevice[];
  initialData?: TabLogsModalFormData;
};

export type TabLogsModalFormData = {
  gatewayKey?: string;
  deviceKey?: string[];
  dateRange?: [Dayjs, Dayjs];
};

const { RangePicker } = DatePicker;

const rangePresets: TimeRangePickerProps["presets"] = [
  {
    label: <span aria-label="Hoy">Hoy</span>,
    value: [dayjs().startOf("day"), dayjs().endOf("day")],
  },
  { label: "Última Semana", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Últimas dos Semanas", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Último mes", value: [dayjs().add(-30, "d"), dayjs()] },
];
export const TabLogsFetchModal: FC<Props> = ({
  onFinish,
  onCancel,
  gatewayList,
  deviceList,
  initialData = {
    gatewayKey: "",
  },
}) => {
  const { errors, valid, formData, updateData } =
    useFormValidation<TabLogsModalFormData>(
      yup.object({
        gatewayKey: yup.string().required("El gateway es requerido"),
        deviceKey: yup
          .array()
          .of(yup.string())
          .required("El dispositivo es requerido")
          .min(1, "Debe seleccionar al menos un dispositivo"),
        dateRange: yup
          .array()
          .of(yup.date())
          .required("El rango de fechas es requerido")
          .length(2, "El rango de fechas debe tener dos fechas"),
      }),
      initialData,
    );

  return (
    <Modal
      title={"Visualización de datos"}
      onCancel={onCancel}
      onOk={() => {
        if (valid) onFinish(formData);
      }}
      okButtonProps={{
        disabled: !valid,
      }}
      open={true}
      getContainer={() => document.getElementById("modal_container")!}
    >
      <Form>
        <Form.Item
          status={errors.gatewayKey ? "error" : "validating"}
          label={"Seleccionar gateway"}
          help={errors.gatewayKey}
        >
          <Select
            value={formData.gatewayKey}
            options={gatewayList}
            id={"gatewayKey"}
            fieldNames={{
              label: "key",
              value: "key",
            }}
            onChange={handleValueChange(updateData, "gatewayKey")}
            placeholder={"Seleccionar un gateway"}
          />
        </Form.Item>
        <Form.Item
          status={errors.deviceKey ? "error" : "validating"}
          label={"Seleccionar dispositivos"}
          help={errors.deviceKey}
        >
          <Checkbox.Group
            options={deviceList.map((device) => ({
              label: device.Device.description,
              value: device.Device.key,
              disabled: false,
            }))}
            value={formData.deviceKey}
            onChange={handleValueChange(updateData, "deviceKey")}
          />
        </Form.Item>
        <Form.Item
          status={errors.dateRange ? "error" : "validating"}
          label={"Seleccionar fecha"}
          help={errors.dateRange}
        >
          <RangePicker
            presets={rangePresets}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={handleValueChange(updateData, "dateRange")}
            value={formData.dateRange as any}
            popupStyle={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
