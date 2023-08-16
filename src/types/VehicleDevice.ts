import {Vehicle} from "./Vehicle";
import {Device} from "./Device";
import {ActivityData} from "./App";

export type VehicleDevice = {
    Vehicle: Vehicle
    vehicleId: number
    Device: Device
    deviceId: number
}

export type NewVehicleDeviceFormData = {
    vehicleId: number
    deviceId?: number
    reason: string
}

export type NewVehicleDevice = ActivityData<Omit<NewVehicleDeviceFormData, "reason">>