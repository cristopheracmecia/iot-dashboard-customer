import {RemoteRoleSource} from "../source/role/Remote";

export class RoleRepository {
    static async getRoleList() {
        return await RemoteRoleSource.getRoleList()
    }

    static async getRole(id: number) {
        return await RemoteRoleSource.getRole(id)
    }
}