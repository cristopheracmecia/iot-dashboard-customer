import {Vehicle} from "./Vehicle";

export type Gateway = {
    id: number
    vehicleId?: number
    Vehicle?: Vehicle
    key: string
    description: string
    updatedAt: string
    createdAt: string
}