import React, {FC, useMemo} from "react";
import * as yup from "yup";
import {
    EntityUpdateForm,
    EntityUpdateFormData,
} from "../../../components/EntityUpdateForm";
import {Gateway} from "../../../../types/Gateway";

type Props = {
    onFinish: (data: Partial<Gateway>) => void;
    gateway: Gateway;
};

export const GatewayUpdateForm: FC<Props> = ({gateway, onFinish}) => {
    const formSchema = yup.object<Gateway>({
        description: yup.string().min(10, "Ingrese una descripción válida."),
    });
    const initialItems: EntityUpdateFormData<Gateway>[] = useMemo(() => {
        return [
            {
                key: "id",
                editable: false,
                label: "ID",
                value: gateway.id,
                valueType: "digit",
            },
            {
                key: "key",
                label: "Etiqueta",
                editable: false,
                valueType: "text",
                value: gateway.key,
            },
            {
                key: "description",
                label: "Descripción",
                editable: true,
                valueType: "textarea",
                value: gateway.description
            }
        ];
    }, [gateway]);

    return (
        <div className={"flex flex-col gap-3 items-center justify-center"}>
            <EntityUpdateForm<Gateway>
                onFinish={onFinish}
                initialData={initialItems}
                initialItem={gateway}
                schema={formSchema}
            />
        </div>
    );
};
