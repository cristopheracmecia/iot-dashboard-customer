import {RemoteSourceResponse, UpdateResult} from "../../../types/Source";
import {
    NewVehicle, UpdateVehicle,
    Vehicle
} from "../../../types/Vehicle";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";

export class RemoteVehicleSource extends BaseRemoteSource {
    static async getVehicle(id: number): Promise<RemoteSourceResponse<Vehicle>> {
        try {
            const vehicle = await apiService.postWithAuth("/vehicle/get", {id});
            this.checkResponseCredentials(vehicle);
            return vehicle.data as RemoteSourceResponse<Vehicle>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async getAllVehicles(customerId: number | undefined): Promise<RemoteSourceResponse<Vehicle[]>> {
        try {
            const vehicleList = await apiService.getWithAuth("/vehicle/list", {id: customerId});
            this.checkResponseCredentials(vehicleList);
            return vehicleList.data as RemoteSourceResponse<Vehicle[]>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async createVehicle(data: NewVehicle) : Promise<RemoteSourceResponse<Vehicle>> {
        try {
            const response = await apiService.postWithAuth("/vehicle/create", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<Vehicle>
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async updateVehicle(updateData: UpdateVehicle) : Promise<RemoteSourceResponse<UpdateResult<Vehicle>>> {
        try {
            const response = await apiService.putWithAuth("/vehicle/update", updateData)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<UpdateResult<Vehicle>>
        } catch (e) {
            throw this.parseError(e)
        }
    }
}