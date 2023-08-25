import {RemoteSourceResponse, UpdateResult} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Device, NewDevice, UpdateDevice} from "../../../types/Device";

export class RemoteDeviceSource extends BaseRemoteSource {
    static async getDevice(id: number): Promise<RemoteSourceResponse<Device>> {
        try {
            const device = await apiService.postWithAuth("/device/get", {id});
            this.checkResponseCredentials(device);
            return device.data as RemoteSourceResponse<Device>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async getAllDevices(): Promise<RemoteSourceResponse<Device[]>> {
        try {
            const deviceList = await apiService.getWithAuth("/device/list");
            this.checkResponseCredentials(deviceList);
            return deviceList.data as RemoteSourceResponse<Device[]>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async createDevice(data: NewDevice) : Promise<RemoteSourceResponse<Device>> {
        try {
            const response = await apiService.postWithAuth("/device/create", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<Device>
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async updateDevice(updateData: UpdateDevice) : Promise<RemoteSourceResponse<UpdateResult<Device>>> {
        try {
            const response = await apiService.putWithAuth("/device/update", updateData)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<UpdateResult<Device>>
        } catch (e) {
            throw this.parseError(e)
        }
    }
}