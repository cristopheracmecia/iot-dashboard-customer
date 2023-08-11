import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {NewUserFormData} from "../types/User";
import {UserRepository} from "../data/repository/User";

export function useUserViewModel() {
    const [createState, setCreateState] = useState<AppState<boolean> | null>(null)

    async function createUser(data: NewUserFormData) {
        if(createState?.loading) return
        setCreateState(TaskState.loading())
        try {
            const res= await UserRepository.createUser({
                data: {
                    name: data.name,
                    birthDate: data.birthDate,
                    dni: data.dni,
                    email: data.email,
                    corporateEmail: data.corporateEmail,
                    lastname: data.lastname,
                    password: data.password,
                    roleId: data.roleId,
                    username: data.username
                },
                activity: {
                    reason: data.reason
                }
            })
            if(res!!.ok) {
                setCreateState(TaskState.success(true))
            } else {
                setCreateState(TaskState.error(new Error(res!!.message)))
            }
        } catch (e : any ) {
            setCreateState(TaskState.error(e))
        }
    }

    function onCreateStateReceived() {
        setCreateState(null)
    }

    return {
        createState, createUser, onCreateStateReceived
    }
}