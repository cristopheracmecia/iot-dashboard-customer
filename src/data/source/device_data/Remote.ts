import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {DeviceData} from "../../../types/DeviceData";

export class RemoteDeviceDataSource extends BaseRemoteSource {
    static async getDeviceData(
        gatewayKey: string,
        devices: Array<string>,
        dateStart: Date,
        dateEnd: Date,
        order: "ASC" | "DESC",
        limit: number | undefined = undefined
    ): Promise<RemoteSourceResponse<{
        [deviceKey: string] : Array<DeviceData>
    }>> {
        try {
            const gateway = await apiService.postWithAuth("/device_data/list", {
                gatewayKey,
                devices, dateStart, dateEnd, order, limit
            });
            this.checkResponseCredentials(gateway);
            return gateway.data as RemoteSourceResponse;
        } catch (e) {
            throw this.parseError(e)
        }
    }
}