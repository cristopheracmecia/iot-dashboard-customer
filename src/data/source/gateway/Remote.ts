import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Gateway} from "../../../types/Gateway";

export class RemoteGatewaySource extends BaseRemoteSource {
    static async getGateway(id: number): Promise<RemoteSourceResponse<Gateway>> {
        try {
            const gateway = await apiService.postWithAuth("/gateway/get", {id});
            this.checkResponseCredentials(gateway);
            return gateway.data as RemoteSourceResponse<Gateway>;
        } catch (e) {
            throw this.parseError(e)
        }
    }
    static async getAllGateways(vehicleId: number): Promise<RemoteSourceResponse<Gateway[]>> {
        try {
            const gatewayList = await apiService.postWithAuth("/gateway/list", {id: vehicleId});
            this.checkResponseCredentials(gatewayList);
            return gatewayList.data as RemoteSourceResponse<Gateway[]>;
        } catch (e) {
            throw this.parseError(e)
        }
    }
}