import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {useLoaderData} from "react-router-dom";
import {Device} from "../types/Device";
import {DeviceRepository} from "../data/repository/Device";

export function useDeviceViewModel() {
    const initialDevice = useLoaderData() as Device | null
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [deviceList, setDeviceList] = useState<Device[]    | null>(null)
    const [fetchDeviceState, setFetchDeviceState] = useState<AppState<boolean> | null>(null)
    const [device, setDevice] = useState<Device | null>(initialDevice)
    async function fetchList() {
        if(fetchListState?.loading) return
        setFetchListState(TaskState.loading())
        try {
           const list = await DeviceRepository.getDeviceList()
           if(list.ok) {
               setDeviceList(list.data!!)
                setFetchListState(TaskState.success(true))
           }
           else setFetchListState(TaskState.error(new Error(list.message!!)))
        } catch (error: any) {
           setFetchListState(TaskState.error(error))
        }
    }

    function onFetchListStateReceived() {
        setFetchListState(null)
    }

    async function fetchDevice(id: number) {
        if(fetchDeviceState?.loading) return
        setFetchDeviceState(TaskState.loading())
        try {
            const customer = await DeviceRepository.getDevice(id)
            if(customer.ok) {
                setFetchDeviceState(TaskState.success(true))
                setDevice(customer.data!!)
            } else {
                setFetchDeviceState(TaskState.error(new Error(customer.message!!)))
            }
        } catch (e : any) {
            setFetchDeviceState(TaskState.error(e))
        }
    }

    function onFetchDeviceStateReceived() {
        setFetchDeviceState(null)
    }

    return {
        fetchListState,
        deviceList,
        fetchList,
        onFetchListStateReceived,
        fetchDeviceState,
        fetchDevice,
        onFetchDeviceStateReceived,
        device
    }
}