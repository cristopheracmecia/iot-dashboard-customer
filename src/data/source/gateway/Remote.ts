import {RemoteSourceResponse, UpdateResult} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Gateway, NewGateway, UpdateGateway} from "../../../types/Gateway";

export class RemoteGatewaySource extends BaseRemoteSource {
    static async getGateway(id: number): Promise<RemoteSourceResponse<Gateway>> {
        try {
            const gateway = await apiService.getWithAuth("/gateway/get", {id});
            this.checkResponseCredentials(gateway);
            return gateway.data as RemoteSourceResponse<Gateway>;
        } catch (e) {
            throw this.parseError(e)
        }
    }
    static async getAllGateways(vehicleId: number | undefined): Promise<RemoteSourceResponse<Gateway[]>> {
        try {
            const gatewayList = await apiService.postWithAuth("/gateway/list", {id: vehicleId});
            this.checkResponseCredentials(gatewayList);
            return gatewayList.data as RemoteSourceResponse<Gateway[]>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async createGateway(data: NewGateway): Promise<RemoteSourceResponse<Gateway>> {
        try {
            const response = await apiService.postWithAuth("/gateway/create", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<Gateway>
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async updateGateway(updateData: UpdateGateway): Promise<RemoteSourceResponse<UpdateResult<Gateway>>> {
        try {
            const response = await apiService.putWithAuth("/gateway/update", updateData)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<UpdateResult<Gateway>>
        } catch (e) {
            throw this.parseError(e)
        }
    }
}