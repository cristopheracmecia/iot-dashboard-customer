import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import { VehicleDevice} from "../types/VehicleDevice";
import {VehicleDeviceRepository} from "../data/repository/VehicleDevice";


export function useVehicleDeviceViewModel() {
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [vehicleDeviceList, setVehicleDeviceList] = useState<VehicleDevice[] | null>(null)

    async function fetchList(id: number) {
        if (fetchListState?.loading) return
        setFetchListState(TaskState.loading())
        try {
            const list = await VehicleDeviceRepository.getVehicleDevices(id)
            if (list.ok) {
                setVehicleDeviceList(list.data!!)
                setFetchListState(TaskState.success(true))
            } else setFetchListState(TaskState.error(new Error(list.message!!)))
        } catch (error: any) {
            setFetchListState(TaskState.error(error))
        }
    }

    function onFetchListStateReceived() {
        setFetchListState(null)
    }


    return ({
        fetchListState,
        fetchList,
        onFetchListStateReceived,
        vehicleDeviceList,
    })
}