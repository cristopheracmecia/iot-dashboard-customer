import {Unit} from "./Unit";
import {ActivityData} from "./App";

export type Device = {
    id: number
    key: string
    description: string
    unitId: number
    Unit: Unit
    updatedAt: string
    createdAt: string
}

export type NewDeviceFormData = {
    key: string
    description?: string
    unitId?: number
    reason: string
}

export type UpdateDeviceFormData = {
    key?: string
    description?: string
    unitId?: number
    reason: string
}

export type NewDevice = ActivityData<Omit<NewDeviceFormData, "reason">>

export type UpdateDevice = ActivityData<Omit<UpdateDeviceFormData, "reason">, { id: number }>