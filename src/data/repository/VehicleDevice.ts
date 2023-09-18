import {RemoteVehicleDeviceSource} from "../source/vehicle_device/Remote";

export class VehicleDeviceRepository {
    static async getVehicleDevices(vehicleId: number) {
        return await RemoteVehicleDeviceSource.getVehicleDevices(vehicleId)
    }
}