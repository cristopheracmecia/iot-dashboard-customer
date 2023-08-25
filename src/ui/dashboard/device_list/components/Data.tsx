import { FC } from "react";
import { useBreakpoints } from "../../../hooks/Breakpoint";
import { isSm, isXs, screenIsAnyOf } from "../../../../utils/tailwind.screens";
import { DeviceListTable } from "./Table";
import { DeviceListGrid } from "./Grid";
import { EmptyData } from "../../../components/Empty";
import { Device } from "../../../../types/Device";

export type DeviceListDataProps = {
  data?: Device[] | null;
  onItemClicked: (item: Device) => void;
};
export const DeviceListData: FC<DeviceListDataProps> = (props) => {
  const { breakpoint } = useBreakpoints();
  const isMobile = screenIsAnyOf(breakpoint, isXs, isSm);
  return props.data && props.data.length > 0 ? (
    isMobile ? (
      <DeviceListGrid {...props} />
    ) : (
      <DeviceListTable {...props} />
    )
  ) : (
    <EmptyData
      title={"Sin dispositivos"}
      description={"No hay dispositivos registrados..."}
    />
  );
};
