import {RemoteGatewaySource} from "../source/gateway/Remote";

export class GatewayRepository {
    static async getGatewayList(vehicleId: number) {
        return await RemoteGatewaySource.getAllGateways(vehicleId)
    }

    static async getGateway(id: number) {
        return await RemoteGatewaySource.getGateway(id)
    }
}