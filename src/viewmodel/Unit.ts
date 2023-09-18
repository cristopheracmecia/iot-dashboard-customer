import {useState} from "react";
import {AppState, TaskState} from "../data/domain/State";
import {useLoaderData} from "react-router-dom";
import {Unit} from "../types/Unit";
import {UnitRepository} from "../data/repository/Unit";

export function useUnitViewModel() {
    const initialUnit = useLoaderData() as Unit | null
    const [fetchListState, setFetchListState] = useState<AppState<boolean> | null>(null)
    const [unitList, setUnitList] = useState<Unit[] | null>(null)
    const [fetchUnitState, setFetchUnitState] = useState<AppState<boolean> | null>(null)
    const [unit, setUnit] = useState<Unit | null>(initialUnit)

    async function fetchList() {
        if (fetchListState?.loading) return
        setFetchListState(TaskState.loading())
        try {
            const list = await UnitRepository.getUnitList()
            if (list.ok) {
                setUnitList(list.data!!)
                setFetchListState(TaskState.success(true))
            } else setFetchListState(TaskState.error(new Error(list.message!!)))
        } catch (error: any) {
            setFetchListState(TaskState.error(error))
        }
    }

    function onFetchListStateReceived() {
        setFetchListState(null)
    }

    async function fetchUnit(id: number) {
        if (fetchUnitState?.loading) return
        setFetchUnitState(TaskState.loading())
        try {
            const customer = await UnitRepository.getUnit(id)
            if (customer.ok) {
                setFetchUnitState(TaskState.success(true))
                setUnit(customer.data!!)
            } else {
                setFetchUnitState(TaskState.error(new Error(customer.message!!)))
            }
        } catch (e: any) {
            setFetchUnitState(TaskState.error(e))
        }
    }

    function onFetchUnitStateReceived() {
        setFetchUnitState(null)
    }

    return {
        fetchListState,
        unitList,
        fetchList,
        onFetchListStateReceived,
        fetchUnitState,
        fetchUnit,
        onFetchUnitStateReceived,
        unit
    }
}