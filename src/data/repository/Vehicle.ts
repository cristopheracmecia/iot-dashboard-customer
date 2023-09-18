import {RemoteVehicleSource} from "../source/vehicle/Remote";
import { UpdateVehicleFormData} from "../../types/Vehicle";
import {omit} from "lodash"
import {AuthRepository} from "./Auth";

export class VehicleRepository {
    static async getVehicleList() {
        return await RemoteVehicleSource.getAllVehicles(AuthRepository.getCurrentUser()!!.Customer.id)
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