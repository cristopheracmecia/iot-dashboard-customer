import {RemoteUnitSource} from "../source/unit/Remote";

export class UnitRepository {
    static async getUnitList() {
        return await RemoteUnitSource.getAllUnits()
    }

    static async getUnit(id: number) {
        return await RemoteUnitSource.getUnit(id)
    }
}