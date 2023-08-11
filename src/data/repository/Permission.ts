import {RemoteRoleSource} from "../source/role/Remote";
import {DeleteRoleData, NewRoleData, UpdateRoleData, UpdateRolePermissionsData} from "../../types/Role";
import {RemotePermissionSource} from "../source/permission/Remote";

export class PermissionRepository {
    static async getRolePermissionsList() {
        return await RemotePermissionSource.getRolePermissionsList()
    }

    static async getRolePermissions(id: number) {
        return await RemotePermissionSource.getRolePermissions(id)
    }

    static async updateRolePermissions(data: UpdateRolePermissionsData) {
        return await RemotePermissionSource.updateRolePermissions(data)
    }

    static async getEntries() {
        return await RemotePermissionSource.getEntries()
    }
}