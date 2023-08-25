import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    ActionType,
    EditableProTable,
    ProColumns, ProCoreActionType,
    ProFieldValueType, ProSchemaValueEnumMap, ProSchemaValueEnumObj,
    ProTable,
} from "@ant-design/pro-components";
import {useFormValidation} from "../hooks/Validation";
import {ObjectSchema} from "yup";
import {Alert, Button, Typography} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {Unit} from "../../types/Unit";

type Props<T> = {
    onFinish: (data: Partial<T>) => void;
    initialData: EntityUpdateFormData<T>[];
    initialItem: T;
    schema: ObjectSchema<Partial<T>>;
};

export type EntityUpdateFormData<T> = {
    key: keyof T;
    label: string;
    value: any;
    editable: boolean;
    valueType: ProFieldValueType;
    valueEnum?: ProSchemaValueEnumMap | ProSchemaValueEnumObj
    render?: (
        node: ReactNode,
        item: EntityUpdateFormData<T>,
        index: number,
        action: ProCoreActionType<{}> | undefined
    ) => any;
};

type ChangedValue<T> = {
    key: keyof T;
    oldValue: any;
    newValue: any;
    value?: any;
    label: string;
    valueType: ProFieldValueType;
    render?: EntityUpdateFormData<any>["render"];
};

export function EntityUpdateForm<T>({
                                        initialData,
                                        onFinish,
                                        schema,
                                        initialItem,
                                    }: Props<T>) {
    const navigate = useNavigate();

    const onBackPressed = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
    const {formData, errors, valid, updateAll} = useFormValidation<Partial<T>>(
        schema,
        {},
    );
    const actionRef = useRef<ActionType>();

    const [data, setData] = useState<EntityUpdateFormData<T>[]>(initialData);
    useEffect(() => {
        if (!!data) {
            const newObj = {};
            data.forEach((it) => {
                const actual = initialItem[it.key];
                const newValue = it.value;
                if (actual !== newValue) {
                    (newObj as any)[it.key] = newValue;
                }
                updateAll(newObj);
            });
        }
    }, [data]);

    const changedValues = useMemo(() => {
        const keys = Object.keys(formData) as string[];
        const changedValuesTemp: ChangedValue<T>[] = [];
        keys.forEach((key) => {
            const oldValue = (initialItem as any)[key];
            const newValue = (formData as any)[key];
            const item = data.find((it) => it.key === key)!!;
            changedValuesTemp.push({
                key: key as keyof T,
                label: item.label,
                oldValue,
                newValue,
                valueType: item.valueType,
                render: item.render,
            });
        });
        return changedValuesTemp;
    }, [formData]);

    const errorArray = useMemo(() => {
        return Object.keys(errors).map((key) => {
            return (errors as any)[key];
        });
    }, [errors]);

    const onSubmitClicked = useCallback(() => {
        if (valid) onFinish(formData);
    }, [changedValues, valid, onFinish]);

    const tableColumns: ProColumns<EntityUpdateFormData<T>>[] = useMemo(() => {
        return [
            {
                title: "Propiedad",
                dataIndex: "label",
                valueType: "text",
                ellipsis: true,
                editable: false,
            },
            {
                title: "Actual",
                key: "value",
                dataIndex: "value",
                valueType: (it) => {
                    return it.valueType;
                },
                render: (node, item, index, action) => {
                    return item.render?.(node, item, index, action) ?? node;
                },
                valueEnum: (it) => {
                    return it?.valueEnum ?? null as unknown as {};
                },
            },
            {
                title: "Opciones",
                valueType: "option",
                render: (_, row) =>
                    row.editable
                        ? [
                            <a
                                type={"link"}
                                key="edit"
                                onClick={() => {
                                    actionRef.current?.startEditable(row.key as React.Key);
                                }}
                                className={"dark:text-white"}
                            >
                                Editar
                            </a>,
                        ]
                        : null,
            },
        ];
    }, []);

    return (
        <div className={"flex flex-col gap-2"}>
            {!!errorArray && errorArray.length > 0
                ? errorArray.map((it, i) => (
                    <Alert type={"error"} showIcon message={it} key={`error-${i}`}/>
                ))
                : null}
            <EditableProTable<EntityUpdateFormData<T>>
                toolBarRender={false}
                className={"w-full p-0"}
                actionRef={actionRef}
                value={data}
                onChange={setData as any}
                rowKey="key"
                columnEmptyText="No asignado."
                columns={tableColumns}
                recordCreatorProps={false}
                editable={{
                    type: "single",
                    editableKeys,
                    onChange: setEditableRowKeys,
                    actionRender: (row, config, actions) => {
                        return [actions.save, actions.cancel];
                    },
                    onlyOneLineEditorAlertMessage:
                        "Solo se puede editar una fila a la vez.",
                }}
            />
            {!!changedValues && changedValues.length > 0 ? (
                <div className={"flex flex-col gap-2"}>
                    <Typography.Title level={5}>Cambios Pendientes</Typography.Title>
                    <ProTable<ChangedValue<T>>
                        search={false}
                        toolbar={{
                            settings: [],
                        }}
                        pagination={false}
                        toolBarRender={false}
                        dataSource={changedValues as any}
                        columns={[
                            {
                                title: "Propiedad",
                                dataIndex: "label",
                                valueType: "text",
                                ellipsis: true,
                                editable: false,
                            },
                            {
                                title: "Actual",
                                key: "value",
                                dataIndex: "oldValue",
                                valueType: (item) => {
                                    return item.valueType;
                                },
                                render: (node, row, index, action) => {
                                    row.value = row.oldValue;
                                    return row?.render?.(node, row as any, index, action) ?? node;
                                },
                            },
                            {
                                title: "Nuevo",
                                key: "value",
                                dataIndex: "newValue",
                                valueType: (item) => {
                                    return item.valueType;
                                },
                                render: (node, row, index, action) => {
                                    row.value = row.newValue;
                                    return row?.render?.(node, row as any, index, action) ?? node;
                                },
                            },
                        ]}
                    />
                </div>
            ) : null}
            {!!errorArray && errorArray.length > 0 ? (
                <Alert
                    showIcon
                    type={"info"}
                    message={"Solucione los errores para poder guardar los cambios."}
                />
            ) : null}
            <Button.Group>
                <Button
                    disabled={!valid || changedValues.length === 0}
                    type={"primary"}
                    icon={<FontAwesomeIcon icon={faSave}/>}
                    onClick={onSubmitClicked}
                >
                    Guardar Cambios
                </Button>
                <Button
                    type={"primary"}
                    onClick={onBackPressed}
                    ghost
                    icon={<FontAwesomeIcon icon={faArrowLeft}/>}
                >
                    Volver
                </Button>
            </Button.Group>
        </div>
    );
}
