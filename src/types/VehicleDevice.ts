import {Vehicle} from "./Vehicle";
import {Device} from "./Device";

export type VehicleDevice = {
    Vehicle: Vehicle
    vehicleId: number
    Device: Device
    deviceId: number
}