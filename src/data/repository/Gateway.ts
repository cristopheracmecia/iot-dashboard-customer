import {RemoteGatewaySource} from "../source/gateway/Remote";
import {NewGatewayFormData, UpdateGatewayFormData} from "../../types/Gateway";
import {omit} from "lodash"

export class GatewayRepository {
    static async getGatewayList(vehicleId: number | undefined = undefined) {
        return await RemoteGatewaySource.getAllGateways(vehicleId)
    }

    static async createGateway(data: NewGatewayFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteGatewaySource.createGateway({
            activity,
            data: omit(data, ['reason'])
        })
    }

    static async getGateway(id: number) {
        return await RemoteGatewaySource.getGateway(id)
    }

    static async updateGateway(id: number, data: UpdateGatewayFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteGatewaySource.updateGateway({
            activity,
            data: omit(data, ['reason']),
            id
        })
    }
}