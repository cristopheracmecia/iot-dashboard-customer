import {FC, useEffect} from "react";
import {usePermissionsViewModel} from "../../../../viewmodel/Permissions";
import {toast} from "react-toastify";
import {useAppLoader} from "../../../hooks/Loading";
import {DashboardSubpageContainer} from "../../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../../components/DashboardHeader";
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh, faAdd} from "@fortawesome/free-solid-svg-icons";
import {RolePermissionList} from "./components/List";
import {AddRolePermissionModal} from "./components/Modal";

export const DashboardRolePermissionPage: FC = () => {
    const {
        fetchState,
        fetchRolePermissions,
        rolePermission,
        onFetchStateReceived,
        createEvent,
        requestCreate,
        onCreateEventCompleted,
        entries,
        fetchEntries,
        fetchEntryListState,
        onFetchEntriesStateReceived,
        onUpdateStateReceived,
        updateState,
        updatePermissions
    } = usePermissionsViewModel()


    useEffect(() => {
        void fetchEntries()
    }, [])

    useEffect(() => {
        if (fetchState && !fetchState?.loading) {
            if (fetchState?.hasError) {
                toast.error(fetchState.error!!.message)
                console.log(fetchState.error)
            }
            onFetchStateReceived()
        }
    }, [fetchState])

    useEffect(() => {
        if (fetchEntryListState && !fetchEntryListState?.loading) {
            if (fetchEntryListState?.hasError) {
                toast.error(fetchEntryListState.error!!.message)
                console.log(fetchEntryListState.error)
            }
            onFetchEntriesStateReceived()
        }
    }, [fetchEntryListState])

    useEffect(() => {
        if (updateState && !updateState?.loading) {
            if (updateState?.hasError) {
                toast.error(updateState.error!!.message)
                console.log(updateState.error)
            } else {
                void fetchRolePermissions()
                onCreateEventCompleted()
            }
            onUpdateStateReceived()
        }
    }, [updateState])

    useAppLoader([fetchState, updateState, fetchEntryListState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <DashboardSubpageHeader title={`Permisos para ${rolePermission?.label}`} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>}
                    onClick={fetchRolePermissions}>Actualizar</Button>
            <Button type={"default"} icon={<FontAwesomeIcon icon={faAdd}/>} onClick={requestCreate}>Nuevo</Button>
        </Button.Group>}/>
        {
            createEvent ?
                <AddRolePermissionModal onFinish={updatePermissions} tables={entries || []} role={rolePermission!!}
                                        onClose={onCreateEventCompleted}/> : null
        }
        <div className={"w-full h-full overflow-y-auto"}>
            <RolePermissionList entries={entries} onUpdate={updatePermissions} onAddClick={requestCreate}
                                data={rolePermission?.permissions}/>
        </div>
    </DashboardSubpageContainer>
}