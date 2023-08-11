import {RemoteRoleSource} from "../source/role/Remote";
import {DeleteRoleData, NewRoleData, UpdateRoleData} from "../../types/Role";

export class RoleRepository {
    static async getRoleList() {
        return await RemoteRoleSource.getRoleList()
    }

    static async getRole(id: number) {
        return await RemoteRoleSource.getRole(id)
    }

    static async createRole(data: NewRoleData) {
        return await RemoteRoleSource.createRole(data)
    }

    static async deleteRole(data: DeleteRoleData) {
        return await RemoteRoleSource.deleteRole(data)
    }

    static async updateRole(data: UpdateRoleData) {
        return await RemoteRoleSource.updateRole(data)
    }
}