import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Device} from "../../../types/Device";

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
}