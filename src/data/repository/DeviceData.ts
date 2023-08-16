import {RemoteDeviceDataSource} from "../source/device_data/Remote";

export class DeviceDataRepository {
    static async getDeviceDataList(gatewayKey: string, deviceKey: string, dateStart: Date, dateEnd: Date) {
        return await RemoteDeviceDataSource.getDeviceData(gatewayKey, [deviceKey], dateStart, dateEnd, "ASC")
    }
}