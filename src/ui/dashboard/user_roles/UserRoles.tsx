import {FC, useEffect, useState} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {useRoleViewModel} from "../../../viewmodel/Role";
import {toast} from "react-toastify";
import {UserRoleList} from "./components/List";
import {Role} from "../../../types/Role";
import {CreateRoleModal} from "./components/Modal";
import {DeleteRoleModal} from "./components/DeleteModal";
import {UpdateRoleModal} from "./components/UpdateModal";
import {AppLoader} from "../../components/AppLoader";

type Props = {}

const Data: Array<Role> = []

for (let i = 0; i < 10; i++) {
    Data.push({
        id: i,
        createdAt: Date.now(),
        label: `Rol ${i}`,
        description: `Descripción del Rol ${i}`,
        updatedAt: Date.now()
    })
}
export const DashboardUserRolesPage: FC<Props> = ({}) => {
    const {
        fetchList,
        roleList,
        fetchListState,
        onFetchListStateReceived,
        createEvent,
        requestCreate,
        onCreateEventCompleted,
        createRole,
        createState,
        onCreateStateReceived,
        deleteEvent,
        onDeleteEventCompleted,
        requestDelete,
        deleteState,
        deleteRole,
        updateState,
        updateRole,
        onUpdateEventCompleted,
        onUpdateStateReceived,
        updateEvent,
        requestUpdate,
        onDeleteStateReceived
    } = useRoleViewModel()

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

    useEffect(() => {
        if (createState && !createState?.loading) {
            if (createState?.hasError) {
                toast.error(createState.error!!.message)
                console.log(createState.error)
            } else {
                toast.success("Rol creado.")
                onCreateEventCompleted()
                void fetchList()
            }
            onCreateStateReceived()
        }
    }, [createState])

    useEffect(() => {
        if (deleteState && !deleteState?.loading) {
            if (deleteState?.hasError) {
                toast.error(deleteState.error!!.message)
                console.log(deleteState.error)
            } else {
                toast.success("Rol eliminado.")
                onDeleteEventCompleted()
                void fetchList()
            }
            onDeleteStateReceived()
        }
    }, [deleteState])

    useEffect(() => {
        if (updateState && !updateState?.loading) {
            if (updateState?.hasError) {
                toast.error(updateState.error!!.message)
                console.log(updateState.error)
            } else {
                toast.success("Información actualizada.")
                onUpdateEventCompleted()
                void fetchList()
            }
            onUpdateStateReceived()
        }
    }, [updateState])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader
            loading={(!!fetchListState && fetchListState.loading) || (!!createState && createState.loading) || (!!updateState && updateState.loading)}/>
        {
            createEvent ?
                <CreateRoleModal open={true} onFinish={createRole} onClose={onCreateEventCompleted}/> : null
        }
        {
            deleteEvent ?
                <DeleteRoleModal onClose={onDeleteEventCompleted} item={deleteEvent} onDelete={deleteRole}/> : null
        }
        {
            updateEvent ?
                <UpdateRoleModal onClose={onUpdateEventCompleted} item={updateEvent} onUpdate={updateRole}/> : null
        }
        <DashboardSubpageHeader title={"Roles de Usuario"} extra={<Button.Group>
            <Button type={"primary"} icon={<FontAwesomeIcon icon={faRefresh}/>} onClick={fetchList}>Actualizar</Button>
            <Button type={"dashed"} icon={<FontAwesomeIcon icon={faPlus}/>} onClick={requestCreate}>Nuevo</Button>
        </Button.Group>}/>
        <UserRoleList onCreateClick={requestCreate} data={roleList} onAction={(index, action) => {
            if (roleList) {
                const item = roleList[index]
                switch (action) {
                    case "delete":
                        requestDelete(item)
                        break
                    case "edit":
                        requestUpdate(item)
                        break
                }
            }
        }}/>
    </DashboardSubpageContainer>
}