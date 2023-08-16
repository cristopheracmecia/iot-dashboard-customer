import {omit} from "lodash"
import {RemoteVehicleDeviceSource} from "../source/vehicle_device/Remote";
import {NewVehicleDeviceFormData} from "../../types/VehicleDevice";

export class VehicleDeviceRepository {
    static async getVehicleDevices(vehicleId: number) {
        return await RemoteVehicleDeviceSource.getVehicleDevices(vehicleId)
    }

    static async createVehicleDevice(data: NewVehicleDeviceFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteVehicleDeviceSource.createVehicleDevice({
            activity,
            data: omit(data, ['reason'])
        })
    }
}