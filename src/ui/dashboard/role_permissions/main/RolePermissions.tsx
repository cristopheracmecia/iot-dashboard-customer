import {FC, useEffect} from "react";
import {DashboardSubpageContainer} from "../../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../../components/DashboardHeader";
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {useAppLoader} from "../../../hooks/Loading";
import {UserPermissionRoleList} from "./components/List";
import {usePermissionsViewModel} from "../../../../viewmodel/Permissions";
import {useNavigate} from "react-router-dom";

export const DashboardRolePermissionsListPage: FC = () => {
    const navigate = useNavigate()
    const {
        fetchList,
        roleList,
        fetchListState,
        onFetchListStateReceived,
    } = usePermissionsViewModel()

    useEffect(() => {
        void fetchList()
    }, [])

    useEffect(() => {
        if (fetchListState && !fetchListState?.loading) {
            if (fetchListState?.hasError) {
                toast.error(fetchListState.error!!.message)
                console.log(fetchListState.error)
            }
            onFetchListStateReceived()
        }
    }, [fetchListState])

    useAppLoader([fetchListState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <DashboardSubpageHeader title={"Permisos"} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>} onClick={fetchList}>Actualizar</Button>
        </Button.Group>}/>
        <UserPermissionRoleList data={roleList} onClick={(index) => {
            if (roleList) {
                const item = roleList[index]
                navigate(`/dashboard/users/permissions/${item.id}`)
            }
        }} onEmptyCreateClick={()=>{
            navigate(`/dashboard/users/roles`)
        }}/>
    </DashboardSubpageContainer>
}