import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {NewGatewayFormData, UpdateGatewayFormData, Gateway} from "../types/Gateway";
import {GatewayRepository} from "../data/repository/Gateway";

export function useGatewayViewModel() {
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [gatewayList, setGatewayList] = useState<Gateway[]    | null>(null)
    const [createGatewayState, setCreateGatewayState] = useState<AppState<boolean> | null>(null)
    const [updateGatewayState, setUpdateGatewayState] = useState<AppState<boolean> | null>(null)
    const [fetchGatewayState, setFetchGatewayState] = useState<AppState<boolean> | null>(null)
    const [vehicleGateway, setVehicleGateway] = useState<Array<Gateway> | null>(null)
    const [gateway, setGateway] = useState<Gateway | null>(null)
    const [addEvent, setAddEvent] = useState<boolean | null>(null)

    function requestAddEvent() {
        setAddEvent(true)
    }

    function onAddEventComplete() {
        setAddEvent(null)
    }
    async function fetchList(id: number | undefined = undefined) {
        if(fetchListState?.loading) return
        setFetchListState(TaskState.loading())
        try {
           const list = await GatewayRepository.getGatewayList(id)
           if(list.ok) {
               setGatewayList(list.data!!)
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

    async function createGateway(gateway: NewGatewayFormData) {
        if(createGatewayState?.loading) return
        try {
            const newCustomer = await GatewayRepository.createGateway(gateway)
            if(newCustomer.ok) {
                setCreateGatewayState(TaskState.success(true))
                setGatewayList([...(gatewayList ?? []), newCustomer.data!!])
            } else {
                setCreateGatewayState(TaskState.error(new Error(newCustomer.message!!)))
            }
        } catch (error: any) {
            setCreateGatewayState(TaskState.error(error))
        }
    }

    function onCreateGatewayStateReceived() {
        setCreateGatewayState(null)
    }

    async function updateGateway(data: UpdateGatewayFormData) {
        if(updateGatewayState?.loading) return
        if(!gateway) setUpdateGatewayState(TaskState.error(new Error("No gateway data")))
        try {
            const updateGateway = await GatewayRepository.updateGateway(gateway!!.id, data)
            if(updateGateway.ok) {
                setUpdateGatewayState(TaskState.success(true))
                const newList = gatewayList?.filter(c => c.id !== updateGateway.data!!.old.id) ?? []
                setGatewayList([...newList, updateGateway.data!!.data])
            } else {
                setUpdateGatewayState(TaskState.error(new Error(updateGateway.message!!)))
            }
        } catch (e : any) {
            setUpdateGatewayState(TaskState.error(e))
        }
    }


    async function assignVehicleGateway(gatewayId: number, data: UpdateGatewayFormData) {
        if(updateGatewayState?.loading) return
        setUpdateGatewayState(TaskState.loading())
        try {
            const updateGateway = await GatewayRepository.updateGateway(gatewayId, data)
            if(updateGateway.ok) {
                setUpdateGatewayState(TaskState.success(true))
                const newList = gatewayList?.filter(c => c.id !== updateGateway.data!!.old.id) ?? []
                setGatewayList([...newList, updateGateway.data!!.data])
            } else {
                setUpdateGatewayState(TaskState.error(new Error(updateGateway.message!!)))
            }
        } catch (e : any) {
            setUpdateGatewayState(TaskState.error(e))
        }
    }
    function onUpdateGatewayStateReceived() {
        setUpdateGatewayState(null)
    }

    async function fetchGateway(id: number) {
        if(fetchGatewayState?.loading) return
        try {
            const customer = await GatewayRepository.getGateway(id)
            if(customer.ok) {
                setFetchGatewayState(TaskState.success(true))
                setGateway(customer.data!!)
            } else {
                setFetchGatewayState(TaskState.error(new Error(customer.message!!)))
            }
        } catch (e : any) {
            setFetchGatewayState(TaskState.error(e))
        }
    }

    async function fetchVehicleGateway(vehicleId: number) {
        if(fetchGatewayState?.loading) return
        setFetchGatewayState(TaskState.loading())
        try {
            const gateway = await GatewayRepository.getGatewayList(vehicleId)
            if(gateway.ok) {
                setFetchGatewayState(TaskState.success(true))
                setVehicleGateway(gateway.data!!)
            } else {
                setFetchGatewayState(TaskState.error(new Error(gateway.message!!)))
            }
        } catch (e : any) {
            setFetchGatewayState(TaskState.error(e))
        }
    }

    function onFetchGatewayStateReceived() {
        setFetchGatewayState(null)
    }

    return {
        fetchListState,
        gatewayList,
        fetchList,
        onFetchListStateReceived,
        createGatewayState,
        createGateway,
        onCreateGatewayStateReceived,
        updateGatewayState,
        updateGateway,
        onUpdateGatewayStateReceived,
        fetchGatewayState,
        fetchGateway,
        onFetchGatewayStateReceived,
        fetchVehicleGateway,
        gateway,
        addEvent,
        requestAddEvent,
        onAddEventComplete,
        vehicleGateway,
        assignVehicleGateway
    }
}