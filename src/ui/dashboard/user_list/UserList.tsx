import {FC, useCallback, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {Button} from "antd";
import {faPlus, faRefresh} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useUserListViewModel} from "../../../viewmodel/UserList";
import {toast} from "react-toastify";
import {useAppLoader} from "../../hooks/Loading";
import {UserListTable} from "./components/Table";
import {useNavigate} from "react-router-dom";

export const DashboardUserListPage: FC = () => {
    const {fetchList, fetchState, userList, onFetchStateReceived} = useUserListViewModel()
    const navigate = useNavigate()

    const onNewUserClick = useCallback(() => {
        navigate("/dashboard/users/create")
    }, [])
    useAppLoader([fetchState])

    useEffect(() => {
        void fetchList()
    }, [])

    useEffect(() => {
        if (!fetchState?.loading) {
            if (fetchState?.hasError) {
                toast.error(fetchState?.error?.message)
            }
            onFetchStateReceived()
        }
    }, [fetchState])

    return <DashboardSubpageContainer>
        <DashboardSubpageHeader title={"Lista de Usuarios"} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>} onClick={fetchList}>Actualizar</Button>
            <Button type={"dashed"} icon={<FontAwesomeIcon icon={faPlus}/>} onClick={onNewUserClick}>Nuevo</Button>
        </Button.Group>}/>
        <UserListTable data={userList}/>
    </DashboardSubpageContainer>
}