import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {useLoaderData} from "react-router-dom";
import {Device, NewDeviceFormData, UpdateDeviceFormData} from "../types/Device";
import {DeviceRepository} from "../data/repository/Device";

export function useDeviceViewModel() {
    const initialDevice = useLoaderData() as Device | null
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [deviceList, setDeviceList] = useState<Device[]    | null>(null)
    const [createDeviceState, setCreateDeviceState] = useState<AppState<boolean> | null>(null)
    const [updateDeviceState, setUpdateDeviceState] = useState<AppState<boolean> | null>(null)
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

    async function createDevice(device: NewDeviceFormData) {
        if(createDeviceState?.loading) return
        try {
            const newCustomer = await DeviceRepository.createDevice(device)
            if(newCustomer.ok) {
                setCreateDeviceState(TaskState.success(true))
                setDeviceList([...(deviceList ?? []), newCustomer.data!!])
            } else {
                setCreateDeviceState(TaskState.error(new Error(newCustomer.message!!)))
            }
        } catch (error: any) {
            setCreateDeviceState(TaskState.error(error))
        }
    }

    function onCreateDeviceStateReceived() {
        setCreateDeviceState(null)
    }

    async function updateDevice(data: UpdateDeviceFormData) {
        if(updateDeviceState?.loading) return
        if(!device) setUpdateDeviceState(TaskState.error(new Error("No device data")))
        try {
            const updateDevice = await DeviceRepository.updateDevice(device!!.id, data)
            if(updateDevice.ok) {
                setUpdateDeviceState(TaskState.success(true))
                const newList = deviceList?.filter(c => c.id !== updateDevice.data!!.old.id) ?? []
                setDeviceList([...newList, updateDevice.data!!.data])
            } else {
                setUpdateDeviceState(TaskState.error(new Error(updateDevice.message!!)))
            }
        } catch (e : any) {
            setUpdateDeviceState(TaskState.error(e))
        }
    }

    function onUpdateDeviceStateReceived() {
        setUpdateDeviceState(null)
    }

    async function fetchDevice(id: number) {
        if(fetchDeviceState?.loading) return
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
        createDeviceState,
        createDevice,
        onCreateDeviceStateReceived,
        updateDeviceState,
        updateDevice,
        onUpdateDeviceStateReceived,
        fetchDeviceState,
        fetchDevice,
        onFetchDeviceStateReceived,
        device
    }
}