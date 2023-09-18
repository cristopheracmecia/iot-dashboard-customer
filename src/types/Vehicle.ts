import {Customer} from "./Customer";
import {ActivityData} from "./App";

export type Vehicle = {
    id: number
    name: string
    plate: string
    brand: string
    model: string
    photo: string
    description: string
    createdAt: string
    updatedAt: string
    endAt: string
    enabled: boolean
    Customer: Customer
}

export type UpdateVehicleFormData = {
    enabled?: boolean
    reason: string
}

export type UpdateVehicle = ActivityData<Omit<UpdateVehicleFormData, "reason">, { id: number }>