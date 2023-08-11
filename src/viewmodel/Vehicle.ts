import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {useLoaderData} from "react-router-dom";
import {NewVehicleFormData, UpdateVehicleFormData, Vehicle} from "../types/Vehicle";
import {VehicleRepository} from "../data/repository/Vehicle";

export function useVehicleViewModel() {
    const initialVehicle = useLoaderData() as Vehicle | null
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [vehicleList, setVehicleList] = useState<Vehicle[]    | null>(null)
    const [createVehicleState, setCreateVehicleState] = useState<AppState<boolean> | null>(null)
    const [updateVehicleState, setUpdateVehicleState] = useState<AppState<boolean> | null>(null)
    const [fetchVehicleState, setFetchVehicleState] = useState<AppState<boolean> | null>(null)
    const [vehicle, setVehicle] = useState<Vehicle | null>(initialVehicle)
    async function fetchList(id: number | undefined) {
        if(fetchListState?.loading) return
        setFetchListState(TaskState.loading())
        try {
           const list = await VehicleRepository.getVehicleList(id)
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

    async function createVehicle(vehicle: NewVehicleFormData) {
        if(createVehicleState?.loading) return
        try {
            const newCustomer = await VehicleRepository.createVehicle(vehicle)
            if(newCustomer.ok) {
                setCreateVehicleState(TaskState.success(true))
                setVehicleList([...(vehicleList ?? []), newCustomer.data!!])
            } else {
                setCreateVehicleState(TaskState.error(new Error(newCustomer.message!!)))
            }
        } catch (error: any) {
            setCreateVehicleState(TaskState.error(error))
        }
    }

    function onCreateVehicleStateReceived() {
        setCreateVehicleState(null)
    }

    async function updateVehicle(data: UpdateVehicleFormData) {
        if(updateVehicleState?.loading) return
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
        createVehicleState,
        createVehicle,
        onCreateVehicleStateReceived,
        updateVehicleState,
        updateVehicle,
        onUpdateVehicleStateReceived,
        fetchVehicleState,
        fetchVehicle,
        onFetchVehicleStateReceived,
        vehicle
    }
}