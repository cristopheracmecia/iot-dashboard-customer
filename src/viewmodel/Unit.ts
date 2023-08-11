import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {useLoaderData} from "react-router-dom";
import {NewUnitFormData, Unit, UpdateUnitFormData} from "../types/Unit";
import {UnitRepository} from "../data/repository/Unit";

export function useUnitViewModel() {
    const initialUnit = useLoaderData() as Unit | null
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [unitList, setUnitList] = useState<Unit[]    | null>(null)
    const [createUnitState, setCreateUnitState] = useState<AppState<boolean> | null>(null)
    const [updateUnitState, setUpdateUnitState] = useState<AppState<boolean> | null>(null)
    const [fetchUnitState, setFetchUnitState] = useState<AppState<boolean> | null>(null)
    const [unit, setUnit] = useState<Unit | null>(initialUnit)
    async function fetchList() {
        if(fetchListState?.loading) return
        setFetchListState(TaskState.loading())
        try {
           const list = await UnitRepository.getUnitList()
           if(list.ok) {
               setUnitList(list.data!!)
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

    async function createUnit(data: NewUnitFormData) {
        if(createUnitState?.loading) return
        try {
            const newCustomer = await UnitRepository.createUnit(data)
            if(newCustomer.ok) {
                setCreateUnitState(TaskState.success(true))
                setUnitList([...(unitList ?? []), newCustomer.data!!])
            } else {
                setCreateUnitState(TaskState.error(new Error(newCustomer.message!!)))
            }
        } catch (error: any) {
            setCreateUnitState(TaskState.error(error))
        }
    }

    function onCreateUnitStateReceived() {
        setCreateUnitState(null)
    }

    async function updateUnit(data: UpdateUnitFormData) {
        if(updateUnitState?.loading) return
        if(!unit) setUpdateUnitState(TaskState.error(new Error("No unit data")))
        try {
            const updateVehicle = await UnitRepository.updateUnit(unit!!.id, data)
            if(updateVehicle.ok) {
                setUpdateUnitState(TaskState.success(true))
                const newList = unitList?.filter(c => c.id !== updateVehicle.data!!.old.id) ?? []
                setUnitList([...newList, updateVehicle.data!!.data])
            } else {
                setUpdateUnitState(TaskState.error(new Error(updateVehicle.message!!)))
            }
        } catch (e : any) {
            setUpdateUnitState(TaskState.error(e))
        }
    }

    function onUpdateUnitStateReceived() {
        setUpdateUnitState(null)
    }

    async function fetchUnit(id: number) {
        if(fetchUnitState?.loading) return
        try {
            const customer = await UnitRepository.getUnit(id)
            if(customer.ok) {
                setFetchUnitState(TaskState.success(true))
                setUnit(customer.data!!)
            } else {
                setFetchUnitState(TaskState.error(new Error(customer.message!!)))
            }
        } catch (e : any) {
            setFetchUnitState(TaskState.error(e))
        }
    }

    function onFetchVehicleStateReceived() {
        setFetchUnitState(null)
    }

    return {
        fetchListState,
        unitList,
        fetchList,
        onFetchListStateReceived,
        createUnitState,
        createUnit,
        onCreateUnitStateReceived,
        updateUnitState,
        updateUnit,
        onUpdateUnitStateReceived,
        fetchUnitState,
        fetchUnit,
        onFetchVehicleStateReceived,
        unit
    }
}