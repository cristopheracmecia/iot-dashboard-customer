import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {Gateway} from "../types/Gateway";
import {GatewayRepository} from "../data/repository/Gateway";

export function useGatewayViewModel() {
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [gatewayList, setGatewayList] = useState<Gateway[]    | null>(null)
    const [fetchGatewayState, setFetchGatewayState] = useState<AppState<boolean> | null>(null)
    const [vehicleGateway, setVehicleGateway] = useState<Array<Gateway> | null>(null)
    const [gateway, setGateway] = useState<Gateway | null>(null)

    async function fetchList(id: number) {
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

    async function fetchGateway(id: number) {
        if(fetchGatewayState?.loading) return
        setFetchGatewayState(TaskState.loading())
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
        fetchGatewayState,
        fetchGateway,
        onFetchGatewayStateReceived,
        fetchVehicleGateway,
        gateway,
        vehicleGateway,
    }
}