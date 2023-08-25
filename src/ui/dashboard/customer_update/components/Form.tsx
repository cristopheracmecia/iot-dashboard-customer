import React, { FC, useMemo } from "react";
import { Customer } from "../../../../types/Customer";
import * as yup from "yup";
import {
  EntityUpdateForm,
  EntityUpdateFormData,
} from "../../../components/EntityUpdateForm";

type Props = {
  onFinish: (data: Partial<Customer>) => void;
  customer: Customer;
};

export const CustomerUpdateForm: FC<Props> = ({ customer, onFinish }) => {
  const formSchema = yup.object<Customer>({
    address: yup.string().min(3, "Ingrese una dirección válida."),
    postalCode: yup.string().min(3, "Ingrese un código postal válido."),
    endAt: yup.date(),
  });

  const initialItems: EntityUpdateFormData<Customer>[] = useMemo(() => {
    return [
      {
        key: "id",
        editable: false,
        label: "ID",
        value: customer.id,
        valueType: "digit",
      },
      {
        key: "businessName",
        label: "Razón Social",
        editable: false,
        valueType: "text",
        value: customer.businessName,
      },
      {
        key: "ruc",
        label: "RUC",
        editable: false,
        valueType: "text",
        value: customer.ruc,
      },
      {
        key: "subdomain",
        label: "Subdominio",
        editable: false,
        valueType: "text",
        value: customer.subdomain,
      },
      {
        key: "createdAt",
        label: "Creación",
        editable: false,
        valueType: "date",
        value: customer.createdAt,
      },
      {
        key: "address",
        label: "Dirección",
        editable: true,
        valueType: "text",
        value: customer.address,
      },
      {
        key: "postalCode",
        label: "Código Postal",
        editable: true,
        valueType: "text",
        value: customer.postalCode,
      },
      {
        key: "enabled",
        label: "Estado",
        editable: true,
        valueType: "switch",
        value: customer.enabled,
        render: (node, item) => {
          return item.valueType === "switch"
            ? item.value === true
              ? "Cliente activo"
              : "Cliente inactivo"
            : node;
        },
      },
      {
        key: "endAt",
        label: "Fecha Cese de Servicio",
        editable: true,
        valueType: "date",
        value: customer.endAt,
      },
    ];
  }, [customer]);

  return (
    <div className={"flex flex-col"}>
      <EntityUpdateForm<Customer>
        onFinish={onFinish}
        initialData={initialItems}
        initialItem={customer}
        schema={formSchema}
      />
    </div>
  );
};
