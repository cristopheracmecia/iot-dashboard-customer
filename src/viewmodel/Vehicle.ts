import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {UpdateVehicleFormData, Vehicle} from "../types/Vehicle";
import {VehicleRepository} from "../data/repository/Vehicle";

export function useVehicleViewModel() {
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [vehicleList, setVehicleList] = useState<Vehicle[]    | null>(null)
    const [updateVehicleState, setUpdateVehicleState] = useState<AppState<boolean> | null>(null)
    const [fetchVehicleState, setFetchVehicleState] = useState<AppState<boolean> | null>(null)
    const [vehicle, setVehicle] = useState<Vehicle | null>()
    async function fetchList() {
        if(fetchListState?.loading) return
        setFetchListState(TaskState.loading())
        try {
           const list = await VehicleRepository.getVehicleList()
           if(list.ok) {
               setVehicleList(list.data!!)
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

    async function updateVehicle(data: UpdateVehicleFormData) {
        if(updateVehicleState?.loading) return
        setUpdateVehicleState(TaskState.loading())
        if(!vehicle) setUpdateVehicleState(TaskState.error(new Error("No vehicle data")))
        try {
            const updateVehicle = await VehicleRepository.updateVehicle(vehicle!!.id, data)
            if(updateVehicle.ok) {
                setUpdateVehicleState(TaskState.success(true))
                const newList = vehicleList?.filter(c => c.id !== updateVehicle.data!!.old.id) ?? []
                setVehicleList([...newList, updateVehicle.data!!.data])
            } else {
                setUpdateVehicleState(TaskState.error(new Error(updateVehicle.message!!)))
            }
        } catch (e : any) {
            setUpdateVehicleState(TaskState.error(e))
        }
    }

    function onUpdateVehicleStateReceived() {
        setUpdateVehicleState(null)
    }

    async function fetchVehicle(id: number) {
        if(fetchVehicleState?.loading) return
        setFetchVehicleState(TaskState.loading())
        try {
            const customer = await VehicleRepository.getVehicle(id)
            if(customer.ok) {
                setFetchVehicleState(TaskState.success(true))
                setVehicle(customer.data!!)
            } else {
                setFetchVehicleState(TaskState.error(new Error(customer.message!!)))
            }
        } catch (e : any) {
            setFetchVehicleState(TaskState.error(e))
        }
    }

    function onFetchVehicleStateReceived() {
        setFetchVehicleState(null)
    }

    return {
        fetchListState,
        vehicleList,
        fetchList,
        onFetchListStateReceived,
        updateVehicleState,
        updateVehicle,
        onUpdateVehicleStateReceived,
        fetchVehicleState,
        fetchVehicle,
        onFetchVehicleStateReceived,
        vehicle,
    }
}