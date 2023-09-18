import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Unit} from "../../../types/Unit";

export class RemoteUnitSource extends BaseRemoteSource {
    static async getUnit(id: number): Promise<RemoteSourceResponse<Unit>> {
        try {
            const unit = await apiService.postWithAuth("/unit/get", {id});
            this.checkResponseCredentials(unit);
            return unit.data as RemoteSourceResponse<Unit>;
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async getAllUnits(): Promise<RemoteSourceResponse<Unit[]>> {
        try {
            const unitList = await apiService.getWithAuth("/unit/list");
            this.checkResponseCredentials(unitList);
            return unitList.data as RemoteSourceResponse<Unit[]>;
        } catch (e) {
            throw this.parseError(e)
        }
    }
}