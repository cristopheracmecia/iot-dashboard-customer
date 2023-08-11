import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {
    EntityTable,
    RolePermissions,
    UpdateRolePermissionsData
} from "../../../types/Role";

export class RemotePermissionSource extends BaseRemoteSource {
    static async getRolePermissions(id: number): Promise<RemoteSourceResponse<RolePermissions> | undefined> {
        const role = await apiService.postWithAuth("/permission/get", {id});
        this.checkResponseCredentials(role);
        return role.data as RemoteSourceResponse<RolePermissions>;
    }

    static async getRolePermissionsList(): Promise<RemoteSourceResponse<Array<RolePermissions>> | undefined> {
        try {
            const roleList = await apiService.getWithAuth("/permission/list");
            this.checkResponseCredentials(roleList);
            return roleList.data as RemoteSourceResponse<Array<RolePermissions>>;
        } catch (e) {
            this.parseError(e)
        }
    }

    static async getEntries(): Promise<RemoteSourceResponse<Array<EntityTable>> | undefined> {
        try {
            const entryList = await apiService.getWithAuth("/permission/entries")
            this.checkResponseCredentials(entryList)
            return entryList.data as RemoteSourceResponse<Array<EntityTable>>
        } catch (e) {
            this.parseError(e)
        }
    }

    static async updateRolePermissions(data: UpdateRolePermissionsData) {
        try {
            const response = await apiService.putWithAuth("/permission/update", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse
        } catch (e) {
            this.parseError(e)
        }
    }
}