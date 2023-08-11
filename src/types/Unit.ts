import {ActivityData} from "./App";

export type Unit = {
    id: number
    name: string
    description: string
    key: string
    updatedAt: string
    createdAt: string
}

export type NewUnitFormData = {
    name: string
    description?: string
    key: string
    reason: string
}

export type NewUnit = ActivityData<Omit<NewUnitFormData, "reason">>

export type UpdateUnitFormData = {
    name?: string
    description?: string
    reason: string
}

export type UpdateUnit = ActivityData<Omit<UpdateUnitFormData, "reason">, { id: number }>

