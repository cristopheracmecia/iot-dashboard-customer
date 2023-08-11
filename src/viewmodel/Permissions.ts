import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {EntityPermissions, EntityTable, RolePermissions, UpdateRoleFormData} from "../types/Role";
import {PermissionRepository} from "../data/repository/Permission";
import {useLoaderData, useParams} from "react-router-dom";


export function usePermissionsViewModel() {
    const initialData = useLoaderData() as RolePermissions | undefined
    const {id} = useParams()
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null);
    const [fetchEntryListState, setFetchEntryListState] = useState<AppState<boolean> | null>(null);
    const [updateState, setUpdateState] = useState<AppState<boolean> | null>(null)
    const [roleList, setRoleList] = useState<Array<RolePermissions> | undefined>()
    const [createEvent, setCreateEvent] = useState<boolean | null>(null)
    const [fetchState, setFetchState] = useState<AppState<boolean> | null>(null);
    const [rolePermission, setRolePermission] = useState<RolePermissions | undefined>(initialData)
    const [entries, setEntries] = useState<Array<EntityTable> | null>(null)

    function requestCreate() {
        setCreateEvent(true)
    }

    function onCreateEventCompleted() {
        setCreateEvent(null)
    }

    async function fetchList() {
        if (fetchListState?.loading) return
        setFetchListState(TaskState.loading());
        try {
            const roles = await PermissionRepository.getRolePermissionsList()
            if (roles!!.ok) {
                setRoleList(roles!!.data!!)
                setFetchListState(TaskState.success(true))
            } else {
                setFetchListState(TaskState.error(new Error(roles!!.message)))
            }
        } catch (e: any) {
            setFetchListState(TaskState.error(e));
        }
    }

    async function fetchRolePermissions() {
        if (fetchState?.loading) return
        setFetchState(TaskState.loading());
        if(!id) return
        try {
            const role = await PermissionRepository.getRolePermissions(Number.parseInt(id))
            if (role!!.ok) {
                setRolePermission(role!!.data!!)
                setFetchState(TaskState.success(true))
            } else {
                setFetchState(TaskState.error(new Error(role!!.message)))
            }
        } catch (e: any) {
            setFetchState(TaskState.error(e));
        }
    }

    function onFetchListStateReceived() {
        setFetchListState(null);
    }

    function onFetchStateReceived() {
        setFetchState(null);
    }

    async function updatePermissions(data: EntityPermissions) {
        if (updateState?.loading) return
        setUpdateState(TaskState.loading());
        try {
            const result = await PermissionRepository.updateRolePermissions({
                data: {
                    create: data.create,
                    update: data.update,
                    delete: data.delete,
                    read: data.read
                },
                id: data.roleId,
                name: data.tableName
            })
            if (result!!.ok) {
                setUpdateState(TaskState.success(true))
            } else {
                setUpdateState(TaskState.error(new Error(result!!.message)))
            }
        } catch (e: any) {
            setUpdateState(TaskState.error(e));
        }
    }

    function onUpdateStateReceived() {
        setUpdateState(null)
    }

    async function fetchEntries() {
        if (fetchEntryListState?.loading) return
        setFetchEntryListState(TaskState.loading());
        try {
            const entries = await PermissionRepository.getEntries()
            if (entries!!.ok) {
                setEntries(entries!!.data!!)
                setFetchEntryListState(TaskState.success(true))
            } else {
                setFetchEntryListState(TaskState.error(new Error(entries!.message)))
            }
        } catch (e: any) {
            setFetchEntryListState(TaskState.error(e));
        }
    }

    function onFetchEntriesStateReceived() {
        setFetchEntryListState(null)
    }

    return {
        fetchListState,
        fetchList,
        onFetchListStateReceived,
        roleList,
        requestCreate,
        onCreateEventCompleted,
        createEvent,
        updatePermissions,
        updateState,
        onUpdateStateReceived,
        fetchRolePermissions,
        fetchState,
        onFetchStateReceived,
        rolePermission,
        entries,
        fetchEntryListState,
        fetchEntries,
        onFetchEntriesStateReceived
    };
}