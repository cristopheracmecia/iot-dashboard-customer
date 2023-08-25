import React, {FC, Fragment, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    ActionType,
    EditableProTable,
} from "@ant-design/pro-components";
import {Form, Modal, Select, Tag, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {isEqual} from "lodash"

type Props = {
    initialSchema?: string;
    showPreview?: boolean;
    editorVisible: boolean;
    onCloseEditor: () => void;
    defaultKey?: string
    onFinish: (schema: string, defaultKey?: string) => void
}

type SchemaValue = {
    name: string
    type: string
    index: number
}

export const DeviceSchemaEditor: FC<Props> = ({
                                                  initialSchema,
                                                  showPreview,
                                                  editorVisible,
                                                  onCloseEditor,
                                                  defaultKey,
                                                  onFinish
                                              }) => {
    const initialSchemaArray: SchemaValue[] = useMemo(() => {
        if (!!initialSchema) {
            const parsed = initialSchema.replace(/\\/g, '').replace(/^"|"$/g, '')
            const obj = JSON.parse(parsed);
            const keys = Object.keys(obj);
            return keys.map((key, i) => {
                return {name: key, type: obj[key], index: i};
            })
        } else {
            return []
        }
    }, [initialSchema])
    const actionRef = useRef<ActionType>();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
    const [data, setData] = useState(initialSchemaArray);
    const [dKey, setDKey] = useState<string | undefined>(defaultKey || undefined)
    const [availableKeys, setAvailableKeys] = useState<string[]>([])
    const [saveEnabled, setSaveEnabled] = useState<boolean>(true)
    useEffect(() => {
        if (!!initialSchema) {
            isEqual(initialSchemaArray, data) && isEqual(defaultKey, dKey) ? setSaveEnabled(false) : setSaveEnabled(true)
        }
        setAvailableKeys((!!data && data.length > 0) ? data.map(it => it.name) : [])
    }, [data, setSaveEnabled, initialSchemaArray, initialSchema, setAvailableKeys, defaultKey, dKey])

    const onSaveClicked = useCallback(() => {
        const temp = [...data]
        const newValue = temp.reduce<any>((acc, it) => {
            acc[it.name] = it.type
            return acc
        }, {})
        onFinish(JSON.stringify(newValue), dKey)
    }, [data, onFinish, dKey])

    return <Fragment>
        {
            showPreview && !!initialSchemaArray && initialSchemaArray.length > 0 ? (
                    <Fragment>
                        {
                            initialSchemaArray.map(it => <div key={it.name}
                                                              className={"flex flex-row flex-wrap my-1 p-1 gap-3"}>
                                <Typography.Paragraph className={"gap-1 flex flex-row flex-wrap"}>
                                    <Typography.Text type={"secondary"} strong>Propiedad</Typography.Text>
                                    <Tag>{it.name}</Tag>
                                </Typography.Paragraph>
                                <Typography.Paragraph className={"gap-1 flex flex-row flex-wrap"}>
                                    <Typography.Text type={"secondary"} strong>Tipo</Typography.Text>
                                    <Tag color={"success"}>{it.type}</Tag>
                                </Typography.Paragraph>
                            </div>)
                        }
                        <div className={"flex flex-row flex-wrap my-1 p-1 gap-1"}>
                            <Typography.Text strong type={"secondary"}>Propiedad por defecto</Typography.Text>
                            {defaultKey ? <Tag>{defaultKey}</Tag> :
                                <Typography.Text type={"secondary"}>No asignado</Typography.Text>}
                        </div>
                    </Fragment>
                ) :
                <Typography.Text type={"secondary"}>No hay esquema</Typography.Text>
        }
        <Modal
            onOk={onSaveClicked}
            okText={"Guardar"}
            okButtonProps={{disabled: !saveEnabled, icon: <FontAwesomeIcon icon={faSave}/>}}
            onCancel={onCloseEditor} title={"Editar Esquema"}
            open={editorVisible} bodyStyle={{overflowY: 'auto', maxHeight: 'calc(100vh - 200px)'}}>
            <EditableProTable<SchemaValue>
                toolBarRender={() => {
                    return [
                        <a onClick={() => {
                            setData(initialSchemaArray)
                            setDKey(defaultKey || undefined)
                        }}>Restablecer</a>
                    ]
                }}
                className={"w-full p-0"}
                actionRef={actionRef}
                value={data}
                onChange={setData as any}
                rowKey="name"
                columnEmptyText="No asignado."
                recordCreatorProps={{
                    record: (index) => {
                        return {type: "string", name: `prop-${index}`, index: index};
                    },
                }}
                columns={[
                    {
                        title: "Propiedad",
                        dataIndex: "name",
                        valueType: "text",
                        ellipsis: true,
                        editable: true as false,
                        formItemProps: {
                            rules: [
                                {
                                    required: true,
                                    whitespace: false,
                                    message: 'El nombre no puede estar vacío.',
                                },
                                {
                                    min: 1,
                                    whitespace: false,
                                    message: 'El nombre no puede estar vacío.',
                                },
                            ]
                        }
                    },
                    {
                        title: "Tipo",
                        dataIndex: "type",
                        valueType: "select",
                        valueEnum: {
                            number: {text: "Numérico"},
                            string: {text: "Texto"},
                            boolean: {text: "Booleano"},
                            date: {text: "Fecha"},
                        },
                        editable: true as false,
                    },
                    {
                        title: "Opciones",
                        valueType: "option",
                        render: (_, row) =>
                            [
                                <a
                                    type={"link"}
                                    key="edit"
                                    onClick={() => {
                                        actionRef.current?.startEditable(row.name as React.Key);
                                    }}
                                    className={"dark:text-white"}
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </a>,
                                <a
                                    type={"link"}
                                    key="delete"
                                    onClick={() => {
                                        if (row.name === dKey) setDKey(undefined)
                                        setData(old => old.filter((item) => item.name !== row?.name))
                                    }}
                                    className={"dark:text-white"}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </a>,
                            ]
                    },
                ]}
                editable={{
                    type: "single",
                    editableKeys,
                    onChange: setEditableRowKeys,
                    actionRender: (row, config, actions) => {
                        return [actions.save, actions.cancel];
                    },
                    onlyOneLineEditorAlertMessage:
                        "Solo se puede editar una fila a la vez.",
                    onlyAddOneLineAlertMessage:
                        "Solo se puede agregar una fila a la vez.",
                }}
            />
            <Form.Item label={"Propiedad principal"}>
                <Select options={availableKeys.map(it => ({label: it, value: it}))} value={dKey} onSelect={setDKey}/>
            </Form.Item>
        </Modal>
    </Fragment>
}