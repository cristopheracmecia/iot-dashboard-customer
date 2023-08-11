import {FC, useState} from "react";
import {Checkbox, Modal, Select, Typography} from "antd";
import {EntityPermissions, EntityTable, RolePermissions} from "../../../../../types/Role";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

type Props = {
    onClose: () => void
    onFinish: (data: EntityPermissions) => void
    tables: Array<EntityTable>
    role: RolePermissions
}

export const AddRolePermissionModal: FC<Props> = ({onClose, tables, onFinish, role}) => {
    const initial = {
        create: false,
        read: true,
        update: false,
        delete: false
    }
    const [tableName, setTableName] = useState<string | undefined>()
    const [editValues, setEditValues] = useState(initial)

    const onChange = (e: CheckboxChangeEvent) => {
        if (e.target.id) {
            setEditValues(old => ({
                ...old, [e.target.id as string]: e.target.checked
            }))
        }
    }

    return <Modal open={true} title={"Designar permisos"} onOk={() => {
        const newData: EntityPermissions = {
            ...editValues,
            tableName: tableName!!,
            roleId: role.id
        }
        onFinish(newData)
    }} onCancel={onClose} okText={"Guardar"} okButtonProps={
        {
            disabled: !tableName, icon: <FontAwesomeIcon icon={faSave}/>
        }
    } cancelText={"Cancelar"}>
        <div className={"w-full flex flex-col gap-4 py-2"}>
            <Select className={"w-full"}
                    placeholder="Selecciona una entidad"
                    optionLabelProp="label"
                    onChange={value => {
                        setTableName(value)
                        setEditValues(initial)
                    }}>
                {
                    tables.map(it => {
                        return <Select.Option key={`op-${it.name}`} value={it.name} label={it.name}>
                            <div className={"flex flex-col w-full"}>
                                <Typography.Title className={"w-full"} level={5}>{it.name}</Typography.Title>
                                <Typography.Paragraph className={"w-full"}>{it.description}</Typography.Paragraph>
                            </div>
                        </Select.Option>
                    })
                }
            </Select>
            {
                tableName ? (<div className={"flex w-full flex-row gap-2 flex-wrap"}>
                    <Checkbox onChange={onChange} id={"create"} checked={editValues.create}>Crear</Checkbox>
                    <Checkbox onChange={onChange} id={"update"} checked={editValues.update}>Editar</Checkbox>
                    <Checkbox onChange={onChange} id={"delete"} checked={editValues.delete}>Eliminar</Checkbox>
                    <Checkbox onChange={onChange} id={"read"} checked={editValues.read}>Leer</Checkbox>
                </div>) : null
            }
        </div>
    </Modal>

}