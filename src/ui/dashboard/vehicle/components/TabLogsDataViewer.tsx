import { FC } from "react";
import { VehicleDeviceData } from "../../../../types/DeviceData";
import { isEmpty } from "lodash";
import { EmptyData } from "../../../components/Empty";
import { Card, Typography } from "antd";
import { Line } from "@ant-design/plots";
import { LineConfig } from "@ant-design/charts";
import { formatDate } from "../../../../utils/Dates";

type Props = {
  deviceData?: VehicleDeviceData[] | null;
};

export const TabLogsDataViewer: FC<Props> = ({ deviceData }) => {
  return !deviceData || isEmpty(deviceData) ? (
    <EmptyData
      description={
        "No se encontraron datos para mostrar. Seleccione otro rango de fecha. "
      }
    ></EmptyData>
  ) : (
    <ItemsRenderer dataArray={deviceData} />
  );
};

const ItemsRenderer: FC<{
  dataArray: VehicleDeviceData[];
}> = ({ dataArray }) => {
  return (
    <div
      className={
        "w-full h-full overflow-x-hidden overflow-y-auto grid grid-cols-2 gap-4"
      }
    >
      {dataArray.map((it, i) => (
        <GraphicRenderer data={dataArray[i]} key={`${it.device.key}-rep`} />
      ))}
    </div>
  );
};

const GraphicRenderer: FC<{
  data: VehicleDeviceData;
}> = ({ data }) => {
  const graphicData = data.data.map((it) => {
    return {
      date: it.createdAt,
      ...it.value,
    };
  });
  const rangeStart = new Date(graphicData[0].date);
  const rangeEnd = new Date(graphicData[graphicData.length - 1].date);

  const config: LineConfig = {
    data: graphicData,
    padding: "auto",
    xField: "date",
    yField: data.device.defaultKey,
    xAxis: {
      tickCount: 0,
    },
    slider: {
      start: 0.1,
      end: 0.5,
      formatter: (v) => {
        return formatDate(rangeStart, rangeEnd, v);
      },
    },
    color: "#1a2a53",
  };

  return (
    <Card>
      <div className={"w-full h-full border-2 border-black rounded"}>
        <Typography.Title level={5}>{data.device.description}</Typography.Title>
        <Typography.Text>{data.device.key}</Typography.Text>
        <div style={{ height: 400 }}>
          <Line {...config} height={400} />
        </div>
      </div>
    </Card>
  );
};
