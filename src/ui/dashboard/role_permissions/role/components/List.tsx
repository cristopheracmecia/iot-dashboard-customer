import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {EntityPermissions, EntityTable} from "../../../../../types/Role";
import {Button, Checkbox, ConfigProvider, Divider, Typography} from "antd";
import {faSave, faEdit, faCancel, faAdd} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {isEqual, first, filter} from "lodash"
import {EmptyData} from "../../../../components/Empty";

type Props = {
    data?: EntityPermissions[]
    onUpdate: (item: EntityPermissions) => void
    onAddClick: () => void
    entries?: EntityTable[] | null
}
export const RolePermissionList: FC<Props> = ({data, entries, onAddClick, onUpdate}) => {
    const onRowUpdateRequest = useCallback((newData: EntityPermissions) => {
        onUpdate(newData)
    }, [])

    return <div>
        {
            (!!data && data.length > 0) ? data.map(it => <RowItem entries={entries} onUpdate={onRowUpdateRequest}
                                                                  key={`${it.roleId}-${it.tableName}`} it={it}/>) :
                <EmptyData title={"Sin roles"} description={"No se han registrado roles para los usuarios"}>
                    <Button icon={<FontAwesomeIcon icon={faAdd}/>} type={"primary"} onClick={onAddClick}>Nuevo</Button>
                </EmptyData>
        }
    </div>
}

type RowProps = {
    it: EntityPermissions
    onUpdate: (newData: EntityPermissions) => void
    entries?: Array<EntityTable> | null
}

const RowItem: FC<RowProps> = ({it, onUpdate, entries}) => {
    const initial = {
        create: it.create,
        read: it.read,
        update: it.update,
        delete: it.delete
    }
    const entry = useMemo(() => {
        return first(filter(entries, (e) => e.name === it.tableName))
    }, [it])
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditSwitch = useCallback(() => {
        setEditMode(old => !old)
    }, [setEditMode])
    const [editValues, setEditValues] = useState(initial)
    const [locked, setLocked] = useState(true)

    useEffect(() => {
        setLocked(isEqual(initial, editValues))
    }, [editValues])

    useEffect(() => {
        if (!editMode) setEditValues(initial)
    }, [editMode])
    const onChange = (e: CheckboxChangeEvent) => {
        if (e.target.id) {
            setEditValues(old => ({
                ...old, [e.target.id as string]: e.target.checked
            }))
        }
    }

    const onUpdateClick = () => {
        const newData: EntityPermissions = {
            ...it,
            ...editValues
        }
        onUpdate(newData)
    }

    return <div>
        <div className={"flex-col flex p-5 w-full gap-4"}>
            <Typography.Text><span className={"font-semibold w-full"}>Entidad: </span> {it.tableName}
            </Typography.Text>
            <Typography.Paragraph><span
                className={"font-semibold w-full"}>Descripción: </span> {entry?.description ? entry.description : 'No asignado.'}
            </Typography.Paragraph>
            <div className={"flex flex-wrap flex-row items-center w-full justify-end gap-4"}>
                {
                    editMode ?
                        <Typography.Text className={"inline p-0 m-0"}>Guardado</Typography.Text> : null
                }
                <div className={"flex flex-row justify-end flex-wrap gap-2 items-center"}>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: "#ef4444",
                            colorBgContainer: "#EFEFEF",
                        }
                    }}>
                        <Checkbox checked={it.create}>Crear</Checkbox>
                        <Checkbox checked={it.update}>Editar</Checkbox>
                        <Checkbox checked={it.delete}>Eliminar</Checkbox>
                        <Checkbox checked={it.read}>Leer</Checkbox>
                        <Button onClick={onEditSwitch} type={"primary"}
                                icon={<FontAwesomeIcon icon={editMode ? faCancel : faEdit}/>}>
                            {
                                editMode ? 'Cancelar' : 'Editar'
                            }
                        </Button>
                    </ConfigProvider>
                </div>
            </div>
            {
                editMode ? (<div className={"w-full flex flex-row justify-end flex-wrap gap-2 items-center"}>
                    <Checkbox onChange={onChange} id={"create"} checked={editValues.create}>Crear</Checkbox>
                    <Checkbox onChange={onChange} id={"update"} checked={editValues.update}>Editar</Checkbox>
                    <Checkbox onChange={onChange} id={"delete"} checked={editValues.delete}>Eliminar</Checkbox>
                    <Checkbox onChange={onChange} id={"read"} checked={editValues.read}>Leer</Checkbox>
                    <Button disabled={locked} type={"primary"} icon={<FontAwesomeIcon icon={faSave}/>}
                            onClick={onUpdateClick}>Guardar</Button>
                </div>) : null
            }
        </div>
        <Divider />
    </div>
}