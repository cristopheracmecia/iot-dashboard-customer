import {FC} from "react";
import {Modal, Typography} from "antd";
import {Unit} from "../../../../types/Unit";
import {ProDescriptions} from "@ant-design/pro-components";

type Props = {
    onClose: () => void;
    unit: Unit;
}

export const UnitModal : FC<Props> = ({onClose, unit}) => {
    return <Modal open={true} title={"Unidad"}>
        <Typography.Text type={"secondary"}>{unit.name}</Typography.Text>
        <ProDescriptions>
            <ProDescriptions.Item label={"ID"}>{unit.id}</ProDescriptions.Item>
            <ProDescriptions.Item label={"Etiqueta"}>{unit.key}</ProDescriptions.Item>
            <ProDescriptions.Item label={"Descripción"}>{unit.description}</ProDescriptions.Item>
        </ProDescriptions>
    </Modal>
}