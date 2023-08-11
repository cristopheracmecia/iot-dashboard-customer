import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {RoleRepository} from "../data/repository/Role";
import {DeleteRoleFormData, NewRoleFormData, Role, UpdateRoleFormData} from "../types/Role";


export function useRoleViewModel() {
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null);
    const [createState, setCreateState] = useState<AppState<boolean> | null>(null);
    const [deleteState, setDeleteState] = useState<AppState<boolean> | null>(null)
    const [updateState, setUpdateState] = useState<AppState<boolean> | null>(null)
    const [roleList, setRoleList] = useState<Array<Role> | undefined>()
    const [createEvent, setCreateEvent] = useState<boolean>(false)
    const [deleteEvent, setDeleteEvent] = useState<Role | null>(null)
    const [updateEvent, setUpdateEvent] = useState<Role | null>()

    function requestCreate() {
        setCreateEvent(true)
    }

    function onCreateEventCompleted() {
        setCreateEvent(false)
    }

    function requestUpdate(role: Role) {
        setUpdateEvent(role)
    }

    function onUpdateEventCompleted() {
        setUpdateEvent(null)
    }

    function requestDelete(role: Role) {
        setDeleteEvent(role)
    }

    function onDeleteEventCompleted() {
        setDeleteEvent(null)
    }

    async function fetchList() {
        if (fetchListState?.loading) return
        setFetchListState(TaskState.loading());
        try {
            const roles = await RoleRepository.getRoleList()
            if (roles!.ok) {
                setRoleList(roles!.data!!)
                setFetchListState(TaskState.success(true))
            } else {
                setFetchListState(TaskState.error(new Error(roles!.message)))
            }
        } catch (e: any) {
            setFetchListState(TaskState.error(e));
        }
    }

    function onFetchListStateReceived() {
        setFetchListState(null);
    }

    async function createRole(data: NewRoleFormData) {
        if (createState?.loading) return
        setCreateState(TaskState.loading());
        try {
            const result = await RoleRepository.createRole({
                data: {
                    label: data.label,
                    description: data.description
                }, activity: {
                    reason: data.reason
                }
            })
            if (result!.ok) {
                setCreateState(TaskState.success(true))
            } else {
                setCreateState(TaskState.error(new Error(result!.message)))
            }
        } catch (e: any) {
            setCreateState(TaskState.error(e));
        }
    }

    function onCreateStateReceived() {
        setCreateState(null)
    }

    async function deleteRole(data: DeleteRoleFormData) {
        if (deleteState?.loading) return
        if (!deleteEvent) setDeleteState(TaskState.error(new Error("No se ha seleccionado un cargo para eliminar.")))
        setDeleteState(TaskState.loading());
        try {
            const result = await RoleRepository.deleteRole({
                data: {
                    id: deleteEvent!!.id
                }, activity: {
                    reason: data.reason
                }
            })
            if (result!.ok) {
                setDeleteState(TaskState.success(true))
            } else {
                setDeleteState(TaskState.error(new Error(result!.message)))
            }
        } catch (e: any) {
            setDeleteState(TaskState.error(e));
        }
    }

    function onDeleteStateReceived() {
        setDeleteState(null)
    }

    async function updateRole(data: UpdateRoleFormData) {
        if (updateState?.loading) return
        if (!updateEvent) setUpdateState(TaskState.error(new Error("No se ha seleccionado un cargo para actualizar.")))
        setUpdateState(TaskState.loading());
        try {
            const result = await RoleRepository.updateRole({
                data: {
                    description: data.description,
                }, activity: {
                    reason: data.reason
                },
                id: updateEvent!!.id
            })
            if (result!.ok) {
                setUpdateState(TaskState.success(true))
            } else {
                setUpdateState(TaskState.error(new Error(result!.message)))
            }
        } catch (e: any) {
            setUpdateState(TaskState.error(e));
        }
    }

    function onUpdateStateReceived() {
        setUpdateState(null)
    }

    return {
        fetchListState,
        fetchList,
        onFetchListStateReceived,
        roleList,
        createEvent,
        requestCreate,
        onCreateEventCompleted,
        createState,
        onCreateStateReceived,
        createRole,
        deleteEvent,
        requestDelete,
        onDeleteEventCompleted,
        deleteState,
        deleteRole,
        onDeleteStateReceived,
        requestUpdate,
        onUpdateEventCompleted,
        updateEvent,
        updateRole,
        updateState,
        onUpdateStateReceived
    };
}