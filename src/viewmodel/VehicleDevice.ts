import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {NewVehicleDeviceFormData, VehicleDevice} from "../types/VehicleDevice";
import {VehicleDeviceRepository} from "../data/repository/VehicleDevice";


export function useVehicleDeviceViewModel() {
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [vehicleDeviceList, setVehicleDeviceList] = useState<VehicleDevice[] | null>(null)
    const [createVehicleDeviceState, setCreateVehicleDeviceState] = useState<AppState<boolean> | null>(null)
    const [addEvent, setAddEvent] = useState<boolean | null>(null)
    const [deleteEvent, setDeleteEvent] = useState<boolean | null>(null)

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

    async function createVehicleDevice(vehicleDevice: NewVehicleDeviceFormData) {
        if (createVehicleDeviceState?.loading) return
        setCreateVehicleDeviceState(TaskState.loading())
        try {
            const newCustomer = await VehicleDeviceRepository.createVehicleDevice(vehicleDevice)
            if (newCustomer.ok) {
                setCreateVehicleDeviceState(TaskState.success(true))
                setVehicleDeviceList([...(vehicleDeviceList ?? []), newCustomer.data!!])
            } else {
                setCreateVehicleDeviceState(TaskState.error(new Error(newCustomer.message!!)))
            }
        } catch (error: any) {
            setCreateVehicleDeviceState(TaskState.error(error))
        }
    }

    function onCreateVehicleDeviceStateReceived() {
        setCreateVehicleDeviceState(null)
    }

    function requestAddEvent() {
        setAddEvent(true)
    }

    function onAddEventCompleted() {
        setAddEvent(null)
    }

    return ({
        fetchListState,
        fetchList,
        onFetchListStateReceived,
        vehicleDeviceList,
        createVehicleDeviceState,
        createVehicleDevice,
        onCreateVehicleDeviceStateReceived,
        addEvent, requestAddEvent, onAddEventCompleted
    })
}