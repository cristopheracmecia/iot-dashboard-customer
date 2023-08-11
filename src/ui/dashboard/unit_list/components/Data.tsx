import {FC} from "react";
import {useBreakpoints} from "../../../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../../../utils/tailwind.screens";
import {UnitListTable} from "./Table";
import {UnitListGrid} from "./Grid";
import {EmptyData} from "../../../components/Empty";
import {Unit} from "../../../../types/Unit";

export type UnitListDataProps = {
    data?: Unit[] | null
    onItemClicked: (item: Unit) => void
}
export const UnitListData: FC<UnitListDataProps> = (props) => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)

    return (props.data && props.data.length > 0) ? (isMobile ? <UnitListGrid {...props}/> :
            <UnitListTable {...props}/>) :
        <EmptyData title={"Sin vehículos"} description={"No hay vehículos registrados..."}/>
}