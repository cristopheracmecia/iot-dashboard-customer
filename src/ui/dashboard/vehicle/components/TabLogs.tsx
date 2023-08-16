import {Vehicle} from "../../../../types/Vehicle";
import {FC, useCallback, useEffect} from "react";
import {useVehicleDeviceViewModel} from "../../../../viewmodel/VehicleDevice";
import {Button, Card, notification, Typography} from "antd";
import {EmptyData} from "../../../components/Empty";
import {AppLoader} from "../../../components/AppLoader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faRefresh, faTrash} from "@fortawesome/free-solid-svg-icons";
import {AddVehicleDeviceModal} from "./ModalAddDevice";
import {useDeviceViewModel} from "../../../../viewmodel/Device";
import {RemoteDeviceDataSource} from "../../../../data/source/device_data/Remote";

type Props = {
    vehicle: Vehicle
}

export const VehicleLogsTab: FC<Props> = ({
                                                 vehicle
                                             }) => {

    return (
        <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>

            <AppLoader/>
            <Typography.Title level={5}>Dispositivos</Typography.Title>
            <Typography.Text>Dispositivos disponibles para el vehículo.</Typography.Text>
            <Button.Group className={"block my-2"}>

            </Button.Group>
            <div className={"overflow-y-auto"}>

            </div>
        </div>
    )
}