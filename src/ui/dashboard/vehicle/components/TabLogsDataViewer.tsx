import { FC } from "react";
import { VehicleDeviceData } from "../../../../types/DeviceData";
import { isEmpty } from "lodash";
import { EmptyData } from "../../../components/Empty";
import { Card, Typography } from "antd";
import { Line } from "@ant-design/plots";
import { LineConfig } from "@ant-design/charts";
import { formatDate } from "../../../../utils/Dates";
import GridLayout from "react-grid-layout";

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
  const layout = dataArray.map((it, i) => {
    return {
      i: `${it.device.key}-rep`,
      x: 0,
      y: i === 0 ? 0 : i * 4,
      w: 6,
      h: 6,
    };
  });
  return (
    <div
      className={
        "w-full overflow-x-hidden overflow-y-auto grid grid-cols-2 gap-4"
      }
    >
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={40}
        width={1200}
      >
        {dataArray.map((it, i) => (
          <div
            key={`${it.device.key}-rep`}
            className={"w-full h-full overflow-hidden"}
          >
            <GraphicRenderer data={dataArray[i]} />
          </div>
        ))}
      </GridLayout>
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
    <Card className={"h-full w-full"}>
      <div
        className={"w-full h-full border-2 border-black rounded flex flex-col"}
      >
        <Typography.Title level={5}>{data.device.description}</Typography.Title>
        <Typography.Text>{data.device.key}</Typography.Text>
        <Line {...config} />
      </div>
    </Card>
  );
};
