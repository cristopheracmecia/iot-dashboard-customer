import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {VehicleDevice} from "../../../types/VehicleDevice";

export class RemoteVehicleDeviceSource extends BaseRemoteSource {
    static async getVehicleDevices(id: number): Promise<RemoteSourceResponse<Array<VehicleDevice>>> {
        try {
            const vehicle = await apiService.postWithAuth("/vehicle_device/get", {id});
            this.checkResponseCredentials(vehicle);
            return vehicle.data as RemoteSourceResponse<Array<VehicleDevice>>;
        } catch (e) {
            throw this.parseError(e)
        }
    }
}