import { ProDescriptions } from "@ant-design/pro-components";
import { FC } from "react";
import { Typography } from "antd";
import { Customer } from "../../../../types/Customer";
import dayjs from "dayjs";

type Props = {
  customer: Customer;
};
export const CustomerMainTab: FC<Props> = ({ customer }) => {
  return (
    <div className={"w-full h-full"}>
      <Typography.Title level={5}>Principal</Typography.Title>
      <ProDescriptions>
        <ProDescriptions.Item label={"ID"}>{customer?.id}</ProDescriptions.Item>
        <ProDescriptions.Item label={"Razón Social"}>
          {customer?.businessName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"RUC"}>
          {customer?.ruc}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Dirección"}>
          {customer?.address || "No registrado."}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Cód. Postal"}>
          {customer?.postalCode}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Subdominio"}>
          {customer?.subdomain || "No registrado."}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Creación"}>
          {!!customer?.createdAt
            ? dayjs(customer?.createdAt!!).format("DD/MM/YYYY HH:mm:ss")
            : "No registrado."}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={"Estado"}>
          {customer?.enabled ? "Cliente habilitado" : "Cliente deshabilitado"}
        </ProDescriptions.Item>
      </ProDescriptions>
    </div>
  );
};
