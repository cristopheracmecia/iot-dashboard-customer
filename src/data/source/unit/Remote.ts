import {RemoteSourceResponse, UpdateResult} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {NewUnit, Unit, UpdateUnit} from "../../../types/Unit";

export class RemoteUnitSource extends BaseRemoteSource {
    static async getUnit(id: number): Promise<RemoteSourceResponse<Unit>> {
        try {
            const unit = await apiService.getWithAuth("/unit/get", {id});
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

    static async createUnit(data: NewUnit) : Promise<RemoteSourceResponse<Unit>> {
        try {
            const response = await apiService.postWithAuth("/unit/create", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<Unit>
        } catch (e) {
            throw this.parseError(e)
        }
    }

    static async updateUnit(updateData: UpdateUnit) : Promise<RemoteSourceResponse<UpdateResult<Unit>>> {
        try {
            const response = await apiService.putWithAuth("/unit/update", updateData)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse<UpdateResult<Unit>>
        } catch (e) {
            throw this.parseError(e)
        }
    }
}