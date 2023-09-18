import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {RoleRepository} from "../data/repository/Role";
import {Role} from "../types/Role";


export function useRoleViewModel() {
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null);
    const [roleList, setRoleList] = useState<Array<Role> | undefined>()

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


    return {
        fetchListState,
        fetchList,
        onFetchListStateReceived,
        roleList,
    };
}