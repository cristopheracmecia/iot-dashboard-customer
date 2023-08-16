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

type Props = {
    vehicle: Vehicle
}

export const VehicleDevicesTab: FC<Props> = ({
                                                 vehicle
                                             }) => {
    const {
        vehicleDeviceList,
        createVehicleDevice,
        createVehicleDeviceState,
        onCreateVehicleDeviceStateReceived,
        onFetchListStateReceived,
        fetchListState,
        fetchList,
        addEvent, requestAddEvent, onAddEventCompleted
    } = useVehicleDeviceViewModel()

    const {
        deviceList,
        fetchList: fetchDeviceList,
        fetchListState: fetchDeviceListState,
        onFetchListStateReceived: onFetchDeviceListStateReceived
    } = useDeviceViewModel()

    const fetchVehicleDeviceList = useCallback(() => {
        void fetchList(vehicle.id)
    }, [vehicle])

    useEffect(() => {
        void fetchVehicleDeviceList()
        void fetchDeviceList()
    }, [])

    useEffect(() => {
        if (!!fetchListState && !fetchListState.loading) {
            if (fetchListState.hasError) {
                notification.error({
                    message: "Ocurrió un error al obtener los dispositivos."
                })
            }
            onFetchListStateReceived()
        }
    }, [fetchListState])

    useEffect(() => {
        if (!!fetchDeviceListState && !fetchDeviceListState.loading) {
            if (fetchDeviceListState.hasError) {
                notification.error({
                    message: "Ocurrió un error al obtener los dispositivos."
                })
            }
            onFetchDeviceListStateReceived()
        }
    }, [fetchDeviceListState])

    useEffect(() => {
        if (!!createVehicleDeviceState && !createVehicleDeviceState.loading) {
            if (createVehicleDeviceState.hasError) {
                notification.error({
                    message: createVehicleDeviceState.error?.message
                })
            } else {
                notification.success({
                    message: "Dispositivo registrado correctamente."
                })
                void fetchVehicleDeviceList()
            }
            onCreateVehicleDeviceStateReceived()
            onAddEventCompleted()
        }
    }, [createVehicleDeviceState])

    return (
        <div className={"w-full h-full overflow-x-hidden overflow-y-auto"}>
            {
                addEvent ?
                    <AddVehicleDeviceModal deviceList={deviceList} vehicle={vehicle} onCancel={onAddEventCompleted}
                                           onFinish={createVehicleDevice}/> : null
            }
            <AppLoader loading={!!fetchListState?.loading}/>
            <Typography.Title level={5}>Dispositivos</Typography.Title>
            <Typography.Text>Dispositivos disponibles para el vehículo.</Typography.Text>
            <Button.Group className={"block my-2"}>
                <Button type={"primary"} onClick={fetchVehicleDeviceList} ghost
                        icon={<FontAwesomeIcon icon={faRefresh}/>}>Actualizar</Button>
                <Button onClick={requestAddEvent} type={"primary"} ghost
                        icon={<FontAwesomeIcon icon={faAdd}/>}>Agregar</Button>
            </Button.Group>
            <div className={"overflow-y-auto"}>
                {
                    !!vehicleDeviceList && vehicleDeviceList.length > 0 ? vehicleDeviceList.map((vehicleDevice, index) => (
                        <Card size={"small"} key={`device-${index}`} className={"my-2"}>
                            <Card.Meta title={vehicleDevice.Device.key}
                                       avatar={<Button type={"primary"} shape={"circle"} ghost
                                                       icon={<FontAwesomeIcon icon={faTrash}/>}/>}
                                       description={vehicleDevice.Device.description}/>
                        </Card>
                    )) : <EmptyData description={"No hay dispositivos agregados al vehículo."}/>
                }
            </div>
        </div>
    )
}