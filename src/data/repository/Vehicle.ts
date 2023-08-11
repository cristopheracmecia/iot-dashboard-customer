import {RemoteVehicleSource} from "../source/vehicle/Remote";
import {NewVehicleFormData, UpdateVehicleFormData} from "../../types/Vehicle";
import {omit} from "lodash"

export class VehicleRepository {
    static async getVehicleList(customerID: number | undefined) {
        return await RemoteVehicleSource.getAllVehicles(customerID)
    }

    static async createVehicle(data: NewVehicleFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteVehicleSource.createVehicle({
            activity,
            data: omit(data, ['reason'])
        })
    }

    static async getVehicle(id: number) {
        return await RemoteVehicleSource.getVehicle(id)
    }

    static async updateVehicle(id: number, data: UpdateVehicleFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteVehicleSource.updateVehicle({
            activity,
            data: omit(data, ['reason']),
            id
        })
    }
}