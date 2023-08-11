import {omit} from "lodash"
import {RemoteDeviceSource} from "../source/device/Remote";
import {NewDeviceFormData, UpdateDeviceFormData} from "../../types/Device";

export class DeviceRepository {
    static async getDeviceList() {
        return await RemoteDeviceSource.getAllDevices()
    }

    static async createDevice(data: NewDeviceFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteDeviceSource.createDevice({
            activity,
            data: omit(data, ['reason'])
        })
    }

    static async getDevice(id: number) {
        return await RemoteDeviceSource.getDevice(id)
    }

    static async updateDevice(id: number, data: UpdateDeviceFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteDeviceSource.updateDevice({
            activity,
            data: omit(data, ['reason']),
            id
        })
    }
}