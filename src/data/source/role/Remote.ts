import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {DeleteRoleData, NewRoleData, Role, UpdateRoleData} from "../../../types/Role";

export class RemoteRoleSource extends BaseRemoteSource {
    static async getRole(id: number): Promise<RemoteSourceResponse<Role> | undefined> {
        try {
            const role = await apiService.postWithAuth("/role/get", {id});
            this.checkResponseCredentials(role);
            return role.data as RemoteSourceResponse<Role>;
        } catch (e) {
            this.parseError(e)
        }
    }

    static async getRoleList(): Promise<RemoteSourceResponse<Role[]> | undefined> {
        try {
            const roleList = await apiService.getWithAuth("/role/list");
            this.checkResponseCredentials(roleList);
            return roleList.data as RemoteSourceResponse<Role[]>;
        } catch (e) {
            this.parseError(e)
        }
    }

    static async createRole(data: NewRoleData) {
        try {
            const response = await apiService.postWithAuth("/role/create", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse
        } catch (e) {
            this.parseError(e)
        }
    }

    static async deleteRole(data: DeleteRoleData) {
        try {
            const response = await apiService.postWithAuth("/role/delete", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse
        } catch (e) {
            this.parseError(e)
        }
    }

    static async updateRole(data: UpdateRoleData) {
        try {
            const response = await apiService.putWithAuth("/role/update", data)
            this.checkResponseCredentials(response)
            return response.data as RemoteSourceResponse
        } catch (e) {
            this.parseError(e)
        }
    }
}