import {FC} from "react";
import {useBreakpoints} from "../../../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../../../utils/tailwind.screens";
import {Customer} from "../../../../types/Customer";
import {CustomerListTable} from "./Table";
import {CustomerListGrid} from "./Grid";
import {EmptyData} from "../../../components/Empty";

export type CustomerListDataProps = {
    data?: Customer[] | null
    onItemClicked: (item: Customer) => void
}
export const CustomerListData: FC<CustomerListDataProps> = (props) => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)

    return (props.data && props.data.length > 0) ? (isMobile ? <CustomerListGrid {...props}/> :
            <CustomerListTable {...props}/>) :
        <EmptyData title={"Sin clientes"} description={"No hay clientes registrados..."}/>
}