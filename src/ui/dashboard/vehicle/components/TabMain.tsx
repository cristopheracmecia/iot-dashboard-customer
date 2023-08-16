import {Vehicle} from "../../../../types/Vehicle";
import {FC} from "react";
import {Typography, Descriptions} from "antd";
import {NavLink} from "react-router-dom";

type Props = {
    vehicle: Vehicle
}
export const VehicleMainTab: FC<Props> = ({vehicle}) => {

    return <div className={"w-full h-full"}>
        <Typography.Title level={5}>Principal</Typography.Title>
        <Descriptions bordered>
            <Descriptions.Item label="Nombre">{vehicle.name}</Descriptions.Item>
            <Descriptions.Item label="ID">{vehicle.id}</Descriptions.Item>
            <Descriptions.Item label="Marca">{vehicle.brand}</Descriptions.Item>
            <Descriptions.Item label="Modelo">{vehicle.model}</Descriptions.Item>
            <Descriptions.Item label="Creado el">{new Date(vehicle.createdAt).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Actualizado el">{new Date(vehicle.updatedAt).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label={"Cliente"}><NavLink
                to={`/dashboard/customers/${vehicle.Customer.id}`}>{vehicle.Customer.businessName}</NavLink></Descriptions.Item>
        </Descriptions>
    </div>
}