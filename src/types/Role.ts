import {ActivityData} from "./App";

export type EntityTable = {
    name: string,
    description: string
}

export type Role = {
    id: number
    label: string
    description: string
    createdAt: number,
    updatedAt: number
}

type Permissions = {
    create: boolean,
    read: boolean,
    update: boolean,
    delete: boolean
}

export type EntityPermissions = Permissions & {
    tableName: string
    roleId: number
}

export type RolePermissions = Role & {
    permissions: Array<EntityPermissions>
}

export type NewRoleFormData = {
    label: string
    description: string
    reason: string
}

export type DeleteRoleFormData = {
    reason: string
}

export type NewRoleData = ActivityData<{
    label: string
    description: string
}>

export type DeleteRoleData = ActivityData<{
    id: number
}>

export type UpdateRoleFormData = {
    description: string
    reason: string
}

export type UpdateRoleData = ActivityData<{
    description: string
}, { id: number }>

export type UpdateRolePermissionsData = {
    data: Permissions
    id: number,
    name: string
}