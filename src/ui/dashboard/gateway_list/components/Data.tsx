import {FC} from "react";
import {useBreakpoints} from "../../../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../../../utils/tailwind.screens";
import {GatewayListTable} from "./Table";
import {GatewayListGrid} from "./Grid";
import {EmptyData} from "../../../components/Empty";
import {Gateway} from "../../../../types/Gateway";

export type GatewayListDataProps = {
    data?: Gateway[] | null
    onItemClicked: (item: Gateway) => void
}
export const GatewayListData: FC<GatewayListDataProps> = (props) => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)

    return (props.data && props.data.length > 0) ? (isMobile ? <GatewayListGrid {...props}/> :
            <GatewayListTable {...props}/>) :
        <EmptyData title={"Sin gateways"} description={"No hay gateways registrados..."}/>
}