import {omit} from "lodash"
import {RemoteUnitSource} from "../source/unit/Remote";
import {NewUnitFormData, UpdateUnitFormData} from "../../types/Unit";

export class UnitRepository {
    static async getUnitList() {
        return await RemoteUnitSource.getAllUnits()
    }

    static async createUnit(data: NewUnitFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteUnitSource.createUnit({
            activity,
            data: omit(data, ['reason'])
        })
    }

    static async getUnit(id: number) {
        return await RemoteUnitSource.getUnit(id)
    }

    static async updateUnit(id: number, data: UpdateUnitFormData) {
        const activity = {
            reason: data.reason
        }
        return await RemoteUnitSource.updateUnit({
            activity,
            data: omit(data, ['reason']),
            id
        })
    }
}