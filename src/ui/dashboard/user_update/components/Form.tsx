import React, { FC, useMemo } from "react";
import { User } from "../../../../types/User";
import { ProColumns, ProFieldValueType } from "@ant-design/pro-components";
import * as yup from "yup";
import {
  EntityUpdateForm,
  EntityUpdateFormColumn,
  EntityUpdateFormData,
} from "../../../components/EntityUpdateForm";

type Props = {
  onFinish: (data: Partial<User>) => void;
  user: User;
};

export const UserUpdateForm: FC<Props> = ({ user, onFinish }) => {
  const formSchema = yup.object<User>({
    email: yup.string().email("Ingresa un email válido"),
    name: yup.string().min(3, "Ingrese un nombre válido."),
    lastname: yup.string().min(3, "Ingrese un apellido válido."),
    birthDate: yup.date(),
  });
  const initialItems: EntityUpdateFormData<User>[] = useMemo(() => {
    return [
      {
        key: "id",
        editable: false,
        label: "ID",
        value: user.id,
        valueType: "digit",
      },
      {
        key: "username",
        label: "Nombre de usuario",
        editable: false,
        valueType: "text",
        value: user.username,
      },
      {
        key: "corporateEmail",
        label: "Correo corporativo",
        editable: false,
        valueType: "text",
        value: user.corporateEmail,
      },
      {
        key: "name",
        label: "Nombre(s)",
        editable: true,
        valueType: "text",
        value: user.name,
      },
      {
        key: "lastname",
        label: "Apellido(s)",
        editable: true,
        valueType: "text",
        value: user.lastname,
      },
      {
        key: "email",
        label: "Correo personal",
        editable: true,
        valueType: "text",
        value: user.email,
      },
      {
        key: "birthDate",
        label: "Fecha de nacimiento",
        editable: true,
        valueType: "date",
        value: user.birthDate,
      },
      {
        key: "enabled",
        label: "Habilitado",
        editable: true,
        valueType: "switch",
        value: user.enabled,
      },
    ];
  }, [user]);

  const columns: EntityUpdateFormColumn<User>[] = [
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
      render: (node, item, index) => {
        return node;
      },
    },
  ];

  return (
    <div className={"flex flex-col"}>
      <EntityUpdateForm<User>
        onFinish={onFinish}
        initialData={initialItems}
        initialItem={user}
        columns={columns}
        schema={formSchema}
      />
    </div>
  );
};
