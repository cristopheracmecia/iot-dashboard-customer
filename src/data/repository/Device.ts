import {RemoteDeviceSource} from "../source/device/Remote";

export class DeviceRepository {
    static async getDeviceList() {
        return await RemoteDeviceSource.getAllDevices()
    }


    static async getDevice(id: number) {
        return await RemoteDeviceSource.getDevice(id)
    }
}