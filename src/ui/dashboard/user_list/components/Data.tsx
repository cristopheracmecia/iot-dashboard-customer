import {FC} from "react";
import {User} from "../../../../types/User";
import {useBreakpoints} from "../../../hooks/Breakpoint";
import {isSm, isXs, screenIsAnyOf} from "../../../../utils/tailwind.screens";
import {UserListTable} from "./Table";
import {UserListGrid} from "./Grid";
import {EmptyData} from "../../../components/Empty";

export type UserListDataProps = {
    data?: User[]
    onItemClicked: (item: User) => void
}
export const UserListData: FC<UserListDataProps> = (props) => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)

    return (props.data && props.data.length > 0) ? (isMobile ? <UserListGrid {...props}/> :
            <UserListTable {...props}/>) :
        <EmptyData description={"No hay usuarios registrados."}/>
}