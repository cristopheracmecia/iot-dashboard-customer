import { FC } from "react";
import { DeviceData } from "../../../../types/DeviceData";
import { VehicleDevice } from "../../../../types/VehicleDevice";
import { isEmpty } from "lodash";
import { EmptyData } from "../../../components/Empty";
import { Device } from "../../../../types/Device";
import { Typography } from "antd";
import { Line } from "@ant-design/plots";
import { LineConfig } from "@ant-design/charts";

type Props = {
  deviceData?: { [key: string]: DeviceData[] };
  devices: VehicleDevice[];
};

export const TabLogsDataViewer: FC<Props> = ({ deviceData, devices }) => {
  return !deviceData || isEmpty(deviceData) ? (
    <EmptyData
      description={
        "No se encontraron datos para mostrar. Seleccione otro rango de fecha. "
      }
    ></EmptyData>
  ) : (
    <ItemsRenderer deviceData={deviceData} devices={devices} />
  );
};

const ItemsRenderer: FC<Props> = ({ deviceData, devices }) => {
  const keys = Object.keys(deviceData!!);
  const selectedDevices = keys.map(
    (it) => devices.find((d) => d.Device.key === it)!!.Device,
  );
  return (
    <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
      {keys.map((it, i) => (
        <GraphicRenderer
          deviceKey={it}
          device={selectedDevices!![i]!!}
          data={deviceData!![it]}
          key={it}
        />
      ))}
    </div>
  );
};

const GraphicRenderer: FC<{
  deviceKey: string;
  device: Device;
  data: DeviceData[];
}> = ({ deviceKey, device, data }) => {
  const graphicData = data.map((it) => {
    return {
      ...it,
      ...it.value,
    };
  });

  const config: LineConfig = {
    data: graphicData,
    padding: "auto",
    xField: "createdAt",
    yField: "speed",
    xAxis: {
      tickCount: 0,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return (
    <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
      <Typography.Title level={5}>{device.description}</Typography.Title>
      <Typography.Text>{device.key}</Typography.Text>
      <div style={{ height: 400 }}>
        <Line {...config} height={400} />
      </div>
    </div>
  );
};
