import {FC, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {UserCreateForm} from "./components/Form";
import {useRoleViewModel} from "../../../viewmodel/Role";
import {toast} from "react-toastify";
import {useUserViewModel} from "../../../viewmodel/User";
import {AppLoader} from "../../components/AppLoader";

type Props = {}
export const DashboardUserCreatePage: FC<Props> = ({}) => {
    const {
        fetchList: fetchRoleList,
        fetchListState: fetchRoleListState,
        onFetchListStateReceived: onFetchRoleListStateReceived,
        roleList
    } = useRoleViewModel()
    const {createUser, createState, onCreateStateReceived} = useUserViewModel()
    useEffect(() => {
        if (!!fetchRoleListState && !fetchRoleListState.loading) {
            if (fetchRoleListState.hasError) {
                toast.error(fetchRoleListState.error?.message)
            }
            onFetchRoleListStateReceived()
        }
    }, [fetchRoleListState])

    useEffect(() => {
        if (!!createState && !createState.loading) {
            if (createState.hasError) {
                toast.error(createState.error?.message)
            } else {
                toast.success("Usuario registrado correctamente.")
            }
            onCreateStateReceived()
        }
    }, [createState])

    useEffect(() => {
        void fetchRoleList()
    }, [])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader
            loading={(!!fetchRoleListState && fetchRoleListState.loading) || (!!createState && createState.loading)}/>
        <DashboardSubpageHeader title={"Nuevo Usuario"}/>
        <div className={"w-full h-full overflow-y-auto flex flex-row justify-center items-start"}>
            <div className={"max-w-md w-full p-2"}>
                <UserCreateForm userRoleList={roleList} onFinish={createUser}/>
            </div>
        </div>
    </DashboardSubpageContainer>
}