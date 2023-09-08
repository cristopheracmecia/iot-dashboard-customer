import React, {FC, useMemo} from "react";
import * as yup from "yup";
import {
    EntityUpdateForm,
    EntityUpdateFormData,
} from "../../../components/EntityUpdateForm";
import {Unit} from "../../../../types/Unit";

type Props = {
    onFinish: (data: Partial<Unit>) => void;
    unit: Unit;
};

export const UnitUpdateForm: FC<Props> = ({unit, onFinish}) => {

    const formSchema = yup.object<Unit>({
        name: yup.string().min(3, "Ingrese un nombre válido."),
        description: yup.string().min(3, "Ingrese una descripción válida."),
    });

    const initialItems: EntityUpdateFormData<Unit>[] = useMemo(() => {
        return [
            {
                key: "id",
                editable: false,
                label: "ID",
                value: unit.id,
                valueType: "digit",
            },
            {
                key: "key",
                label: "Etiqueta",
                editable: false,
                valueType: "text",
                value: unit.key,
            },
            {
                key: "name",
                label: "Nombre",
                editable: true,
                valueType: "text",
                value: unit.name,
            },
            {
                key: "description",
                label: "Descripción",
                editable: true,
                valueType: "textarea",
                value: unit.description
            },
        ];
    }, [unit]);

    return (
        <div className={"flex flex-col gap-3 items-center justify-center"}>
            <EntityUpdateForm<Unit>
                onFinish={onFinish}
                initialData={initialItems}
                initialItem={unit}
                schema={formSchema}
            />
        </div>
    );
};
