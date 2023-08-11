import {Vehicle} from "./Vehicle";
import {ActivityData} from "./App";

export type Gateway = {
    id: number
    vehicleId?: number
    Vehicle?: Vehicle
    key: string
    description: string
    updatedAt: string
    createdAt: string
}

export type NewGatewayFormData = {
    key: string
    description?: string
    vehicleId?: number
    reason: string
}

export type NewGateway = ActivityData<Omit<NewGatewayFormData, "reason">>

export type UpdateGatewayFormData = {
    description?: string
    vehicleId?: number
    reason: string
}

export type UpdateGateway = ActivityData<Omit<UpdateGatewayFormData, "reason">, { id: number }>