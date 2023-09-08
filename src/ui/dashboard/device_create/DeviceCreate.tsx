import {FC, useEffect} from "react";
import {DashboardSubpageContainer} from "../../components/DashboardContainer";
import {DashboardSubpageHeader} from "../../components/DashboardHeader";
import {DeviceCreateForm} from "./components/Form";
import {toast} from "react-toastify";
import {useUnitViewModel} from "../../../viewmodel/Unit";
import {useDeviceViewModel} from "../../../viewmodel/Device";
import {AppLoader} from "../../components/AppLoader";

type Props = {}
export const DashboardDeviceCreatePage: FC<Props> = ({}) => {
    const {
        fetchList: fetchUnitList,
        fetchListState: fetchUnitListState,
        onFetchListStateReceived: onFetchUnitListStateReceived,
        unitList
    } = useUnitViewModel()
    const {createDevice, createDeviceState, onCreateDeviceStateReceived} = useDeviceViewModel()
    useEffect(() => {
        if (!!fetchUnitListState && !fetchUnitListState.loading) {
            if (fetchUnitListState.hasError) {
                toast.error(fetchUnitListState.error?.message)
            }
            onFetchUnitListStateReceived()
        }
    }, [fetchUnitListState])

    useEffect(() => {
        if (!!createDeviceState && !createDeviceState.loading) {
            if (createDeviceState.hasError) {
                toast.error(createDeviceState.error?.message)
            } else {
                toast.success("Dispositivo registrado correctamente.")
            }
            onCreateDeviceStateReceived()
        }
    }, [createDeviceState])

    useEffect(() => {
        void fetchUnitList()
    }, [])

    return <DashboardSubpageContainer className={"w-full h-full overflow-hidden"}>
        <AppLoader
            loading={(!!fetchUnitListState && fetchUnitListState.loading) || (!!createDeviceState && createDeviceState.loading)}/>
        <DashboardSubpageHeader title={"Nuevo Dispositivo"}/>
        <div className={"w-full h-full overflow-y-auto flex flex-row justify-center items-start"}>
            <div className={"max-w-md w-full p-2"}>
                <DeviceCreateForm unitList={unitList} onFinish={createDevice}/>
            </div>
        </div>
    </DashboardSubpageContainer>
}