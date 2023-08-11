import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {User} from "../types/User";
import {UserRepository} from "../data/repository/User";


export function useUserListViewModel() {
    const [fetchState, setFetchState] = useState<AppState<boolean> | null>(null);
    const [userList, setUserList] = useState<Array<User> | undefined>()

    async function fetchList() {
        if (fetchState?.loading) return
        setFetchState(TaskState.loading());
        try {
            const users = await UserRepository.getUserList()
            if (users!.ok) {
                setUserList(users!.data!!)
                setFetchState(TaskState.success(true))
            } else {
                setFetchState(TaskState.error(new Error(users!.message)))
            }
        } catch (e: any) {
            setFetchState(TaskState.error(e));
        }
    }

    function onFetchStateReceived() {
        setFetchState(null);
    }


    return {
        fetchState, fetchList, onFetchStateReceived, userList
    };
}