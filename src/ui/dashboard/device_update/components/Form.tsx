import React, {FC, useCallback, useMemo, useState} from "react";
import * as yup from "yup";
import {
    EntityUpdateForm,
    EntityUpdateFormData,
} from "../../../components/EntityUpdateForm";
import {Device} from "../../../../types/Device";
import {Card} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {DeviceSchemaEditor} from "../../device_create/components/SchemaEditor";
import {Unit} from "../../../../types/Unit";

type Props = {
    onFinish: (data: Partial<Device>) => void;
    device: Device;
    unitList?: Unit[] | null
};

export const DeviceUpdateForm: FC<Props> = ({device, onFinish, unitList}) => {
    const [schemaModalVisible, setSchemaModalVisible] = useState(false)
    const formSchema = yup.object<Device>({
        description: yup.string().min(10, "Ingrese una descripción válida."),
        unitId: yup.number()
    });
    const switchSchemaModalVisible = useCallback(() => {
        setSchemaModalVisible(old => !old)
    }, [setSchemaModalVisible])

    const unitValueEnum = useMemo(() => {
        if(!!unitList) {
            return unitList.reduce((acc, unit) => {
                acc[unit.id] = unit.name
                return acc
            }, {} as {[key: string]: string})
        } else {
            return {}
        }
    } , [unitList])
    const initialItems: EntityUpdateFormData<Device>[] = useMemo(() => {
        return [
            {
                key: "id",
                editable: false,
                label: "ID",
                value: device.id,
                valueType: "digit",
            },
            {
                key: "key",
                label: "Etiqueta",
                editable: false,
                valueType: "text",
                value: device.key,
            },
            {
                key: "description",
                label: "Descripción",
                editable: false,
                valueType: "textarea",
                value: device.description
            },
            {
                key: "unitId",
                label: "Unidad",
                editable: true,
                valueType: "select",
                value: device.unitId,
                valueEnum: unitValueEnum
            }
        ];
    }, [device, unitValueEnum]);

    return (
        <div className={"flex flex-col gap-3 items-center justify-center"}>
            <Card title={"Esquema"}
                  bordered={false}
                  className={"w-fit"}
                  actions={[<span
                      onClick={switchSchemaModalVisible}><FontAwesomeIcon icon={faEdit}/> Editar</span>]}
            >
                <DeviceSchemaEditor initialSchema={device.schema} editorVisible={schemaModalVisible}
                                    onCloseEditor={switchSchemaModalVisible} showPreview={true}
                                    defaultKey={device.defaultKey} onFinish={(newSchema, newDefaultKey) => {
                    console.log(newSchema, newDefaultKey)
                }}/>
            </Card>
            <EntityUpdateForm<Device>
                onFinish={onFinish}
                initialData={initialItems}
                initialItem={device}
                schema={formSchema}
            />
        </div>
    );
};
