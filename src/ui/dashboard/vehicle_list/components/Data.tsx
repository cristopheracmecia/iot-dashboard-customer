import {FC} from "react";
import {useBreakpoints} from "../../../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../../../utils/tailwind.screens";
import {VehicleListTable} from "./Table";
import {VehicleListGrid} from "./Grid";
import {EmptyData} from "../../../components/Empty";
import {Vehicle} from "../../../../types/Vehicle";

export type VehicleListDataProps = {
    data?: Vehicle[] | null
    onItemClicked: (item: Vehicle) => void
}
export const VehicleListData: FC<VehicleListDataProps> = (props) => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)

    return (props.data && props.data.length > 0) ? (isMobile ? <VehicleListGrid {...props}/> :
            <VehicleListTable {...props}/>) :
        <EmptyData title={"Sin vehículos"} description={"No hay vehículos registrados..."}/>
}