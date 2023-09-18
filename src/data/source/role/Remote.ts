import {RemoteSourceResponse} from "../../../types/Source";
import {apiService} from "../../../services/RemoteClient";
import {BaseRemoteSource} from "../base/Remote";
import {Role} from "../../../types/Role";

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
        }}
}