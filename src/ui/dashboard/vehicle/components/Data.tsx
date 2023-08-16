import {Vehicle} from "../../../../types/Vehicle";
import {FC, useMemo, useState} from "react";
import {Tabs, TabsProps} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faNetworkWired, faServer, faChartLine} from "@fortawesome/free-solid-svg-icons";
import {useBreakpoints} from "../../../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../../../utils/tailwind.screens";
import {VehicleMainTab} from "./TabMain";
import {VehicleDevicesTab} from "./TabDevices";
import {VehicleGatewayTab} from "./TabGateway";
import {VehicleLogsTab} from "./TabLogs";

type Props = {
    vehicle: Vehicle
}

const items: TabsProps["items"] = [
    {
        key: "main",
        label: <span><FontAwesomeIcon icon={faHome}/> Principal</span>,
    },
    {
        key: "devices",
        label: <span><FontAwesomeIcon icon={faNetworkWired}/> Dispositivos</span>,
    },
    {
        key: "gateway",
        label: <span><FontAwesomeIcon icon={faServer}/> Gateway</span>,
    },
    {
        key: "logs",
        label: <span><FontAwesomeIcon icon={faChartLine}/> Histórico</span>,
    }
]

export const VehicleDataComponent: FC<Props> = ({vehicle}) => {
    const [selectedKey, setSelectedKey] = useState<string>("main")
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)

    const Element = useMemo(() => {
        switch (selectedKey) {
            case "main":
                return <VehicleMainTab vehicle={vehicle}/>
            case "devices":
                return <VehicleDevicesTab vehicle={vehicle}/>
            case "logs":
                return <VehicleLogsTab vehicle={vehicle}/>
            default:
                return <VehicleGatewayTab vehicle={vehicle}/>
        }
    }, [selectedKey])

    return <div className={"w-full h-full overflow-hidden flex flex-col md:flex-row"}>
        <Tabs tabPosition={isMobile ? "top" : "left"} defaultActiveKey={"main"} items={items}
              rootClassName={"h-fit w-full md:h-full md:w-fit"} onChange={(key) => {
            setSelectedKey(key)
        }}/>
        {Element}
    </div>
}